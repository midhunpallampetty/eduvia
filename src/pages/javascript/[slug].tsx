// pages/javascript/[slug].tsx

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import dbConnect from '../../lib/mongodb';
import Tutorial from '@/models/Tutorial';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

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

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: true });

type Props = {
  tutorial: TutorialType;
  tutorials: TutorialType[];
};

const TutorialPage: React.FC<Props> = ({ tutorial, tutorials }) => {
  const [mcqStates, setMcqStates] = useState<
    { selectedOption: number | null; isSubmitted: boolean }[]
  >([]);

  useEffect(() => {
    if (tutorial?.mcqs) {
      const initialStates = tutorial.mcqs.map(() => ({
        selectedOption: null,
        isSubmitted: false,
      }));
      setMcqStates(initialStates);
    }
  }, [tutorial._id]);

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
<Head>
  {/* Basic Meta Tags */}
  
  <title>What is {tutorial.title}? Learn with Examples | JavaScript Tutorial</title>
  <meta
    name="description"
    content={
      tutorial.content ||
      `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}... Learn more about ${tutorial.title} in this JavaScript tutorial.`
    }
  />
  <meta
    name="keywords"
    content={`JavaScript, ${tutorial.title}, JS tutorial, learn JavaScript, ${tutorial.title || tutorial.title.toLowerCase().replace(/\s/g, ', ')}`}
  />
  <meta name="author" content='Eduvia Space' />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {/* Canonical URL */}
  <link rel="canonical" href={`https://eduvia.space/javascript/${tutorial.slug}`} />

  {/* Open Graph Tags */}
  <meta property="og:title" content={`${tutorial.title} | JavaScript Tutorial`} />
  <meta
    property="og:description"
    content={
      tutorial.codeExample ||
      `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}... Learn more about ${tutorial.title}.`
    }
  />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://eduvia.space/javascript/${tutorial.slug}`} />

  <meta property="og:image:alt" content={`Illustration for ${tutorial.title} JavaScript tutorial`} />
  <meta property="og:site_name" content="Eduvia" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${tutorial.title} | JavaScript Tutorial`} />
  <meta
    name="twitter:description"
    content={
      tutorial.content ||
      `${tutorial.content.slice(0, 120).replace(/\n/g, ' ').trim()}... Learn more about ${tutorial.title}.`
    }
  />
  <meta
    name="twitter:image"
    content= 'https://eduvia.space/images/javascript-tutorial.jpg'
  />
  <meta name="twitter:image:alt" content={`Illustration for ${tutorial.title} JavaScript tutorial`} />
  <meta name="twitter:site" content="@EduviaSpace" /> {/* Replace with actual Twitter handle */}
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://eduvia.space/javascript/${tutorial.slug}`
    },
    "headline": `${tutorial.title} | JavaScript Tutorial`,
    "description": tutorial.content.slice(0, 150).replace(/\n/g, ' ').trim(),
    "image": "https://eduvia.space/images/javascript-tutorial.jpg", // Use dynamic if per-article image exists
    "author": {
      "@type": "Organization",
      "name": "Eduvia Space",
      "url": "https://eduvia.space"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eduvia Space",
      "logo": {
        "@type": "ImageObject",
        "url": "https://eduvia.space/logo.png" // Replace with your logo
      }
    },
    "datePublished": new Date().toISOString(), // Ideally store and use real publish date
    "dateModified": new Date().toISOString()
  })}
</script>

</Head>

      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-inter flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen fixed bg-white shadow-xl p-6 overflow-y-auto">
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
    >
      {tut.title}
    </div>
  </Link>
))}

          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 w-full p-10 space-y-14">
          <h1 className="text-4xl font-bold mb-8 animate-fadeInDown">
            JavaScript Tutorial <span className="ml-4 text-green-500 text-3xl">✦</span>
          </h1>

          <section className="space-y-6 bg-white p-6 rounded-xl shadow-md animate-fadeInUp">
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {tutorial.title}
            </h2>

            {/* Markdown content */}
            <div className="prose prose-lg text-gray-700 max-w-none">
              <ReactMarkdown>{tutorial.content}</ReactMarkdown>
            </div>

            {/* Code example */}
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

            {/* MCQs */}
            {(tutorial.mcqs ?? []).length> 0 && (
              <div className="mt-12 space-y-8">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Test Your Knowledge
                </h3>
                {Array.isArray(tutorial.mcqs) && tutorial.mcqs.map((mcq, mcqIndex) => {
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

                      {/* Submit or feedback */}
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
                            : `❌ Incorrect. The correct answer is: ${mcq.options[mcq.correctAnswer]}`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const tutorials = await Tutorial.find().select('slug').lean();

  const paths = tutorials.map((tutorial) => ({
    params: { slug: tutorial.slug },
  }));

  return {
    paths,
    fallback: false, // Use 'blocking' if you plan to add dynamic content
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();
  const tutorial = await Tutorial.findOne({ slug: params?.slug }).lean();
  const tutorials = await Tutorial.find().lean();

  return {
    props: {
      tutorial: JSON.parse(JSON.stringify(tutorial)),
      tutorials: JSON.parse(JSON.stringify(tutorials)),
    },
  };
};

export default TutorialPage;
