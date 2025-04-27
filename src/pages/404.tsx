import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom404() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          padding: '3rem',
          borderRadius: '1.5rem',
          background: 'white',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(0)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <div
          style={{
            marginBottom: '2rem',
            animation: 'bounce 1.5s infinite',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" fill="#fef2f2" stroke="#f87171" />
            <path d="M8 16l4-4 4 4M16 8l-4 4-4-4" stroke="#ef4444" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #ef4444 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '1rem 0',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: '#64748b',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Oops! The page you're looking for seems to have vanished into the digital void. Let's get you back on track.
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '0.5rem',
            background: 'linear-gradient(45deg, #3b82f6 0%, #6366f1 100%)',
            color: 'white',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
          }}
        >
          Return to Homepage
        </Link>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
}