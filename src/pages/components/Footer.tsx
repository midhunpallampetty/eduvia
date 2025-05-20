'use client';

import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-cyan-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Eduvia Space",
            "url": "https://www.eduvia.space",
            "logo": "/icon.png",
            "sameAs": [
              "https://twitter.com/codemaster",
              "https://github.com/codemaster",
              "https://www.linkedin.com/company/codemaster"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "support@eduvia.space",
              "contactType": "Customer Support"
            }
          })}
        </script>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eduvia</h3>
            <p className="text-gray-600 text-sm">
              Empowering developers with tutorials and resources for Python, JavaScript, Java, C++, and Ruby.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tutorials/python"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Python Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/javascript"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  JavaScript Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/java"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Java Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/cpp"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  C++ Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/ruby"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Ruby Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://twitter.com/codemaster"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodeMaster on Twitter"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://github.com/codemaster"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodeMaster on GitHub"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/codemaster"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodeMaster on LinkedIn"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              Email:{' '}
              <a
                href="mailto:support@eduvia.space"
                className="text-blue-600 hover:underline"
              >
                support@eduvia.space
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Eduvia Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}