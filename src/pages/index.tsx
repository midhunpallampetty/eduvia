import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BookOpen, School, Rocket, Globe, Users, Clock, Award, ChevronLeft, ChevronRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false }); 
const Navbar = dynamic(() => import('./components/Navbar'), { ssr: true });

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Swift', 'Go', 'React', 'Node.js'];

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

const stats = [
  { number: "1000+", label: "Interactive Tutorials", icon: <Globe className="w-8 h-8" /> },
  { number: "50K+", label: "Active Learners", icon: <Users className="w-8 h-8" /> },
  { number: "24/7", label: "Code Access", icon: <Clock className="w-8 h-8" /> },
  { number: "98%", label: "Satisfaction Rate", icon: <Award className="w-8 h-8" /> }
];

const testimonials = [
  { name: "Sarah D.", role: "Full Stack Developer", text: "The best learning platform I've used. The React tutorials transformed how I build web applications." },
  { name: "Mike R.", role: "Python Developer", text: "Finally found a place that makes Python concepts crystal clear. The projects are amazing!" },
  { name: "Emma W.", role: "Frontend Engineer", text: "Eduvia Space's JavaScript courses helped me level up my career. Highly recommended!" }
];
type Language = 'javascript' | 'python' | 'java';
const codeExamples:any = {
  javascript: `// Welcome to JavaScript Playground
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`,
  python: `# Welcome to Python Playground
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`,
  java: `// Welcome to Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Developer!");
    }
}`
};

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(codeExamples.javascript);

  const handleEditorChange = (value:any) => setCode(value);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  function getCodeExample(lang: Language) {
    return codeExamples[lang]; // ✅ no error
  }
  return (
    <>
      <Head>
        <title>Eduvia Space - Learn Coding with Interactive Tutorials</title>
        <meta name="description" content="Master programming with EduCraft's interactive courses in JavaScript, Python, Java, and more. Start coding today with our live playground!" />
        <meta name="keywords" content="programming, coding, learn javascript, python tutorial, java course, web development" />
        <meta property="og:title" content="Eduvia Space - Interactive Coding Platform" />
        <meta property="og:description" content="Learn programming with hands-on tutorials and live code editor." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Eduvia Space",
            "description": "Interactive coding learning platform",
            "url": "https://eduvia.space",
            "logo": "https://eduvia.space/logo.png"
          })
        }} />
      </Head>

      <Navbar  />

      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50/20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Coding Skills
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn by doing with our interactive courses and real-time code playground
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Try Playground
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 bg-blue-50/50 rounded-2xl"
                >
                  <div className="text-blue-600 mb-4 mx-auto">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800">{stat.number}</h3>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Code Playground Section */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
          >
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setCode(codeExamples[lang]);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedLanguage === lang 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="h-96 rounded-xl overflow-hidden border border-gray-200">
              <MonacoEditor
                height="100%"
                language={selectedLanguage}
                value={code}
                onChange={handleEditorChange}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Play className="w-5 h-5" /> Run Code
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center text-gray-800 mb-12"
            >
              Explore Learning Paths
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="mb-4 text-blue-600">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg text-white"
              >
                <p className="text-xl mb-6">"{testimonials[currentTestimonial].text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm opacity-80">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Coding Journey Today</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Join our community of developers and transform your career</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Eduvia Space</h3>
              <p className="text-gray-400">Empowering developers through interactive learning</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                {languages.slice(0, 5).map((lang) => (
                  <li key={lang} className="hover:text-white transition-colors">
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors">About</li>
                <li className="hover:text-white transition-colors">Careers</li>
                <li className="hover:text-white transition-colors">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">hello@educraft.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Eduvia Space. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}