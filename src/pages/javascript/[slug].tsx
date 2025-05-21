import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import dbConnect from '../../lib/mongodb';
import Tutorial from '@/models/Tutorial';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Footer from '../components/Footer';


interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QnA {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

interface TutorialType {
  _id: string;
  title: string;
  slug: string;
  content: string;
  codeExample: string;
  order: number;
  mcqs?: MCQ[];
}

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: true });

interface Props {
  tutorial: TutorialType | null;
  tutorials: TutorialType[];
}

const TutorialPage: React.FC<Props> = ({ tutorial, tutorials }) => {
  const [mcqStates, setMcqStates] = useState<
    { selectedOption: number | null; isSubmitted: boolean }[]
  >([]);
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [isLoadingQnas, setIsLoadingQnas] = useState<boolean>(false);
  const [qnaError, setQnaError] = useState<string | null>(null);
  // New state for sidebar toggle on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Initialize MCQ states
  useEffect(() => {
    if (tutorial?.mcqs && Array.isArray(tutorial.mcqs)) {
      setMcqStates(
        tutorial.mcqs.map(() => ({
          selectedOption: null,
          isSubmitted: false,
        }))
      );
    } else {
      setMcqStates([]);
    }
  }, [tutorial?.mcqs]);

  // Fetch Q&A data
  const fetchQnAs = useCallback(async () => {
    if (!tutorial?.slug) return;
    setIsLoadingQnas(true);
    setQnaError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/listQnA?slug=${encodeURIComponent(tutorial.slug)}`,
        {
          headers: {
            'Cache-Control': 'no-store',
          },
          withCredentials: false,
        }
      );
      const data = response.data;
      if (!data.qnas || !Array.isArray(data.qnas)) {
        throw new Error('Invalid Q&A data format');
      }
      setQnas(data.qnas);
    } catch (error) {
      console.error('Error fetching Q&A:', error);
      setQnaError('Failed to load Q&A. Please try again later.');
    } finally {
      setIsLoadingQnas(false);
    }
  }, [tutorial?.slug]);

  useEffect(() => {
    fetchQnAs();
  }, [fetchQnAs]);

  const handleOptionSelect = (mcqIndex: number, optionIndex: number) => {
    setMcqStates((prev) =>
      prev.map((state, index) =>
        index === mcqIndex ? { ...state, selectedOption: optionIndex } : state
      )
    );
  };

  const handleSubmitAnswer = (mcqIndex: number) => {
    setMcqStates((prev) =>
      prev.map((state, index) =>
        index === mcqIndex ? { ...state, isSubmitted: true } : state
      )
    );
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">Tutorial not found.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* Head content remains unchanged */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <title>{`${tutorial.title} | JavaScript Tutorial`}</title>
        <meta
          name="description"
          content={
            tutorial.content
              ? `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}...`
              : `Learn about ${tutorial.title} in this JavaScript tutorial.`
          }
        />
        <meta
          name="keywords"
          content={`JavaScript, ${tutorial.title}, JS tutorial, learn JavaScript, ${tutorial.title
            .toLowerCase()
            .replace(/\s/g, ', ')}`}
        />
        <meta name="author" content="Eduvia Space" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://eduvia.space/javascript/${tutorial.slug}`} />
        <meta property="og:title" content={`${tutorial.title} | JavaScript Tutorial`} />
        <meta
          property="og:description"
          content={
            tutorial.content
              ? `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}...`
              : `Learn about ${tutorial.title}.`
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://eduvia.space/javascript/${tutorial.slug}`} />
        <meta
          property="og:image"
          content="https://eduvia.space/images/javascript-tutorial.jpg"
        />
        <meta
          property="og:image:alt"
          content={`Illustration for ${tutorial.title} JavaScript tutorial`}
        />
        <meta property="og:site_name" content="Eduvia" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tutorial.title} | JavaScript Tutorial`} />
        <meta
          name="twitter:description"
          content={
            tutorial.content
              ? `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}...`
              : `Learn about ${tutorial.title}.`
          }
        />
        <meta
          name="twitter:image"
          content="https://eduvia.space/images/javascript-tutorial.jpg"
        />
        <meta
          name="twitter:image:alt"
          content={`Illustration for ${tutorial.title} JavaScript tutorial`}
        />
        <meta name="twitter:site" content="@EduviaSpace" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://eduvia.space/javascript/${tutorial.slug}`,
              },
              headline: `${tutorial.title} | JavaScript Tutorial`,
              description: tutorial.content
                ? tutorial.content.slice(0, 150).replace(/\n/g, ' ').trim()
                : '',
              image: 'https://eduvia.space/images/javascript-tutorial.jpg',
              author: {
                '@type': 'Organization',
                name: 'Eduvia Space',
                url: 'https://eduvia.space',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Eduvia Space',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://eduvia.space/logo.png',
                },
              },
              datePublished: new Date().toISOString(),
              dateModified: new Date().toISOString(),
            }),
          }}
        />
      </Head>

      <Navbar />
      <div  style={{ fontFamily: "'Rubik', sans-serif",fontWeight:400 }} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-inter flex">
        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-green-500 text-white p-2 rounded-lg focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar: Hidden on mobile, visible on md+ screens */}
        <aside
          className={`w-64 h-screen bg-white shadow-xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-100
            fixed top-0 left-0 z-40 transform transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:w-64 md:fixed`}
        >
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            JS Tutorial
          </h2>
          <nav className="space-y-3">
            {tutorials.map((tut) => (
              <Link key={tut._id} href={`/javascript/${tut.slug}`} passHref>
                <div
                  className={`block p-3 rounded-lg transition-all duration-200 ${
                    tut.slug === tutorial.slug
                      ? 'bg-green-50 border-l-4 border-green-500 text-green-600'
                      : 'hover:bg-gray-50 hover:border-l-4 hover:border-green-300'
                  }`}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click in mobile
                >
                  {tut.title}
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content: Adjust margin based on sidebar visibility */}
        <main   style={{fontSize:25}}
          className={`w-full p-10 space-y-14 transition-all duration-300
            md:ml-64 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
        >
          <h1 className="text-4xl font-bold mt-20">
            JavaScript Tutorial <span className="ml-4 text-green-500 text-3xl">✦</span>
          </h1>

          <section className="space-y-6 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {tutorial.title}
            </h2>

            <div className="prose prose-lg text-gray-700 max-w-none">
              <ReactMarkdown>{tutorial.content || 'No content available.'}</ReactMarkdown>
            </div>

            {tutorial.codeExample && (
              <div className="bg-gray-900 text-green-400 rounded-lg p-4 relative shadow-inner">
                <div className="absolute top-2 right-4 text-sm text-green-500 font-semibold">
                  <button
                    onClick={() =>
                      window.open(
                        `/javascript-compiler?code=${encodeURIComponent(tutorial.codeExample)}`,
                        '_blank'
                      )
                    }
                    className="hover:underline"
                  >
                    Try it Yourself →
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm">
                  <code>{tutorial.codeExample}</code>
                </pre>
              </div>
            )}

            {tutorial.mcqs?.length ? (
              <div className="mt-12 space-y-8">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Test Your Knowledge
                </h3>
                {tutorial.mcqs.map((mcq, mcqIndex) => {
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
                              currentState.isSubmitted && optionIndex === mcq.correctAnswer
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
                            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {isCorrect
                            ? '🎉 Correct! Well done!'
                            : `❌ Incorrect. The correct answer is: ${mcq.options[mcq.correctAnswer]}`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                Questions & Answers Related
              </h3>
              {isLoadingQnas ? (
                <div className="text-gray-600">Loading Q&A...</div>
              ) : qnaError ? (
                <div className="text-red-600">{qnaError}</div>
              ) : !qnas.length ? (
                <div className="text-gray-600">No Q&A available for this topic.</div>
              ) : (
                qnas.map((qna) => (
                  <div
                    key={qna._id}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                  >
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      Question: {qna.question}
                    </h4>
                    <p className="text-gray-700">Explanation: {qna.answer}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const tutorials = await Tutorial.find({}, 'slug').lean();

  const paths = tutorials.map((tutorial) => ({
    params: { slug: tutorial.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();
  const tutorial = await Tutorial.findOne({ slug: params?.slug }).lean();
  const tutorials = await Tutorial.find({}, '_id title slug order')
    .sort({ order: 1 })
    .lean();

  return {
    props: {
      tutorial: tutorial ? JSON.parse(JSON.stringify(tutorial)) : null,
      tutorials: JSON.parse(JSON.stringify(tutorials)),
    },
    revalidate: 60,
  };
};

export default TutorialPage;