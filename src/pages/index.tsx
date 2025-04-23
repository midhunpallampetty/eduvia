import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BookOpen, School, Rocket, Globe, Users, Clock, Award } from "lucide-react";
import dynamic from "next/dynamic";
// Animation variants
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

export default function LandingPage() {
  const Navbar = dynamic(() => import('./components/Navbar'), { ssr: true });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-6 font-sans">
        {/* ... keep existing meta tags ... */}

        <motion.header 
          initial="initial"
          animate="animate"
          className="text-center py-12 overflow-hidden"
        >
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Learn. Code. <span className="text-blue-600">Grow.</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your go-to platform for high-quality tutorials in JavaScript, Python, React, and more.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow transform transition-all hover:scale-105">
              Start Learning
            </button>
          </motion.div>
        </motion.header>

        {/* Stats Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-12 bg-white/50 backdrop-blur-lg rounded-3xl my-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <div className="text-blue-600 mb-4 mx-auto">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-800">{stat.number}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Section */}
        <section className="py-12">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl font-semibold text-center text-gray-700 mb-10"
          >
            Explore Our Top Categories
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col gap-4 cursor-pointer"
              >
                {cat.icon}
                <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-12 my-12"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-12">
            What Our Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 text-center bg-blue-600/10 backdrop-blur-lg rounded-3xl my-12"
        >
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of developers already learning with Eduvia Space
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold"
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-8 border-t mt-12"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EduCraft. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </>
  );
}