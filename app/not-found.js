import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-beige-50 flex flex-col items-center justify-center p-6 text-brand-brown-900">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-display font-extrabold text-brand-green-500">404</h1>
        <div className="w-16 h-px bg-brand-beige-300 mx-auto" />
        <h2 className="text-2xl font-serif">Page Not Found</h2>
        <p className="text-brand-brown-900/60 font-serif italic">
          The manuscript you seek has been lost to the void.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green-500 text-white rounded-xl hover:bg-brand-green-600 transition-colors font-bold text-sm shadow-sm"
          >
            Return to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
