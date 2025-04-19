import React from "react";
import { Code2, BookOpen, School, Rocket } from "lucide-react";

const categories = [
  {
    title: "JavaScript Tutorials",
    icon: <Code2 className="w-6 h-6 text-yellow-500" />,
    description: "Master JavaScript from basics to advanced levels with real-world examples."
  },
  {
    title: "Python Guides",
    icon: <Rocket className="w-6 h-6 text-blue-600" />,
    description: "Dive into Python with hands-on projects and interactive coding practice."
  },
  {
    title: "React Learning",
    icon: <BookOpen className="w-6 h-6 text-sky-500" />,
    description: "Understand React from scratch and build dynamic web apps with ease."
  },
  {
    title: "Tech Tutorials",
    icon: <School className="w-6 h-6 text-green-500" />,
    description: "Explore hundreds of tutorials on modern technologies and frameworks."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-6 font-sans">
      
  <title>Eduvia Space - Learn JavaScript, Python, React & More</title>
  <meta
    name="google-site-verification"
    content="your_verification_code_here"
/>
  <meta
    name="description"
    content="Eduvia Space is your futuristic learning hub for mastering JavaScript, Python, React, and modern technologies. Inspired by JavaTpoint & W3Schools — but better, sleeker, and smarter."
  />
  <meta
    name="keywords"
    content="JavaScript tutorials, Python guides, React learning, web development, Eduvia Space, programming tutorials, coding courses, frontend, backend"
  />
  <meta name="author" content="Eduvia Space Team" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="Eduvia Space - Futuristic Coding Tutorials" />
  <meta
    property="og:description"
    content="Explore beautiful, modern tutorials on JavaScript, Python, React, and more. Learn. Code. Grow with Eduvia Space."
  />
  <meta property="og:image" content="/preview.png" /> {/* Replace with actual image path */}
  <meta property="og:url" content="https://www.eduviaspace.com" /> {/* Replace with your live URL */}
  <meta property="og:type" content="website" />

  {/* Twitter Card Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Eduvia Space - Futuristic Coding Tutorials" />
  <meta
    name="twitter:description"
    content="Master the latest in web development with Eduvia Space. From JavaScript to Python and beyond — level up your coding game."
  />
  <meta name="twitter:image" content="/preview.png" /> {/* Replace with actual image path */}


      <header className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Learn. Code. Grow.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Your go-to platform for high-quality tutorials in JavaScript, Python, React, and more. Inspired by JavaTpoint and W3Schools — but modern and sleek.
        </p>
        <div className="mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow">
            Start Learning
          </button>
        </div>
      </header>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-10">
          Explore Our Top Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col gap-4"
            >
              {cat.icon}
              <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 border-t mt-12">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} EduCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
