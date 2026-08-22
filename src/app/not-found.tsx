import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on the Motor Head website.",
};

export default function NotFound() {
  return (
    <main className="flex-1 w-full bg-[#050505] text-white flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <h1 className="text-8xl font-heading font-black text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold uppercase mb-6">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold uppercase tracking-wider rounded transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
