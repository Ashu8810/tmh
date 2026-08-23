import { notFound } from "next/navigation";
import { mediaItems } from "@/data/mediaData";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return mediaItems.map((item) => ({
    id: item.id,
  }));
}

export default function MediaEventPage({ params }: PageProps) {
  const item = mediaItems.find((m) => m.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/media"
          className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase mb-12 group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Gallery
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/2">
            <span className="text-[#D71920] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
              {item.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tighter text-white mb-6">
              {item.title}
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">{item.description}</p>
          </div>
          <div className="md:w-1/2 relative h-[300px] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(215,25,32,0.15)]">
            <img
              src={item.coverImage}
              alt={`${item.title} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-40" />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-zinc-200 mb-8">
            Event Highlights
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {item.gallery.map((media, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden bg-[#121212] group break-inside-avoid"
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={media.alt}
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="relative pt-[56.25%] bg-zinc-900 w-full flex justify-center items-center">
                    <span className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest text-sm">
                      Video Player Placeholder
                    </span>
                  </div>
                )}
                {/* Viewfinder Corners on Hover */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
