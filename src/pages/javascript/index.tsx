import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import dbConnect from '../../lib/mongodb';
import Tutorial from '@/models/Tutorial';

const JavaScriptTutorialPage = ({ tutorials }: any) => {
  const Navbar = dynamic(() => import('../components/Navbar'), { ssr: true });

  const [selectedSlug, setSelectedSlug] = useState<string>(tutorials[0]?.slug || '');

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sortedTutorials = tutorials.sort((a: any, b: any) => a.order - b.order);
  const selectedTutorial = sortedTutorials.find((t: any) => t.slug === selectedSlug);
  
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
            {tutorials.map((tutorial: any) => (
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
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedTutorial.content}
              </p>

              <div className="bg-gray-900 text-green-400 rounded-lg p-4 relative shadow-inner">
                <div className="absolute top-2 right-4 text-sm text-green-500 font-semibold">
                  Try it Yourself →
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm">
                  <code>{selectedTutorial.codeExample}</code>
                </pre>
              </div>
            </section>
          )}
        </main>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .animate-fadeInDown {
            animation: fadeInDown 0.6s ease-out;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
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
