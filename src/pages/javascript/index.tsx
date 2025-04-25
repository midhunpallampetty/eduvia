import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import dbConnect from '../../lib/mongodb';
import Tutorial from '@/models/Tutorial';
import ReactMarkdown from 'react-markdown';

type MCQ = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type TutorialType = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  codeExample: string;
  order: number;
  mcqs?: MCQ[];
};

const JavaScriptTutorialPage = ({ tutorials }: { tutorials: TutorialType[] }) => {
  const Navbar = dynamic(() => import('../components/Navbar'), { ssr: true });
  const [selectedSlug, setSelectedSlug] = useState<string>(tutorials[0]?.slug || '');
  const [mcqStates, setMcqStates] = useState<{ selectedOption: number | null; isSubmitted: boolean }[]>([]);

  useEffect(() => {
    // Initialize MCQ states when tutorial changes
    if (selectedTutorial?.mcqs) {
      const initialStates = selectedTutorial.mcqs.map(() => ({
        selectedOption: null,
        isSubmitted: false,
      }));
      setMcqStates(initialStates);
    } else {
      setMcqStates([]);
    }
  }, [selectedSlug]);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedTutorials = tutorials.sort((a, b) => a.order - b.order);
  const selectedTutorial = sortedTutorials.find((t) => t.slug === selectedSlug);

  const handleOptionSelect = (mcqIndex: number, optionIndex: number) => {
    const newStates = [...mcqStates];
    newStates[mcqIndex] = {
      ...newStates[mcqIndex],
      selectedOption: optionIndex,
    };
    setMcqStates(newStates);
  };

  const handleSubmitAnswer = (mcqIndex: number) => {
    const newStates = [...mcqStates];
    newStates[mcqIndex] = {
      ...newStates[mcqIndex],
      isSubmitted: true,
    };
    setMcqStates(newStates);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-inter flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen fixed bg-white shadow-xl p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            JS Tutorial
          </h2>
          <nav className="space-y-3">
            {tutorials.map((tutorial) => (
              <button
                key={tutorial._id}
                onClick={() => handleSelect(tutorial.slug)}
                className={`w-full text-left group block p-3 rounded-lg transition-all duration-200 ${
                  selectedSlug === tutorial.slug
                    ? 'bg-green-50 border-l-4 border-green-500 text-green-600'
                    : 'hover:bg-gray-50 hover:border-l-4 hover:border-green-300'
                }`}
              >
                <span className="group-hover:translate-x-2 transition-transform">
                  {tutorial.title}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 w-full p-10 space-y-14">
          <h1 className="text-4xl font-bold mb-8 animate-fadeInDown">
            JavaScript Tutorial
            <span className="ml-4 text-green-500 text-3xl">✦</span>
          </h1>

          {selectedTutorial && (
            <section className="space-y-6 bg-white p-6 rounded-xl shadow-md animate-fadeInUp">
              <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {selectedTutorial.title}
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <ReactMarkdown>{selectedTutorial.content}</ReactMarkdown>
              </div>

              <div className="bg-gray-900 text-green-400 rounded-lg p-4 relative shadow-inner">
                <div className="absolute top-2 right-4 text-sm text-green-500 font-semibold">
                  <button
                    onClick={() =>
                      window.open(
                        `/javascript-compiler?code=${encodeURIComponent(selectedTutorial.codeExample)}`,
                        '_blank'
                      )
                    }
                    className="hover:underline"
                  >
                    Try it Yourself →
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm">
                  <code>{selectedTutorial.codeExample}</code>
                </pre>
              </div>

              {/* MCQs Section */}
              {selectedTutorial.mcqs && selectedTutorial.mcqs.length > 0 && (
                <div className="mt-12 space-y-8">
                  <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Test Your Knowledge
                  </h3>
                  {selectedTutorial.mcqs.map((mcq, mcqIndex) => {
                    const currentState = mcqStates[mcqIndex] || {
                      selectedOption: null,
                      isSubmitted: false,
                    };
                    const isCorrect = currentState.selectedOption === mcq.correctAnswer;

                    return (
                      <div
                        key={mcqIndex}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                      >
                        <h4 className="text-lg font-semibold mb-4">{mcq.question}</h4>
                        <div className="space-y-3">
                          {mcq.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleOptionSelect(mcqIndex, optionIndex)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                currentState.selectedOption === optionIndex
                                  ? 'bg-green-50 border-2 border-green-500'
                                  : 'border border-gray-200 hover:border-green-300'
                              } ${
                                currentState.isSubmitted &&
                                optionIndex === mcq.correctAnswer
                                  ? 'bg-green-100 border-green-600'
                                  : ''
                              }`}
                              disabled={currentState.isSubmitted}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {!currentState.isSubmitted ? (
                          <button
                            onClick={() => handleSubmitAnswer(mcqIndex)}
                            disabled={currentState.selectedOption === null}
                            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div
                            className={`mt-4 p-3 rounded-lg ${
                              isCorrect
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {isCorrect
                              ? '🎉 Correct! Well done!'
                              : `❌ Incorrect. The correct answer is: ${
                                  mcq.options[mcq.correctAnswer]
                                }`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  await dbConnect();
  const tutorials = await Tutorial.find().lean();

  return {
    props: {
      tutorials: JSON.parse(JSON.stringify(tutorials)),
    },
  };
};

export default JavaScriptTutorialPage;