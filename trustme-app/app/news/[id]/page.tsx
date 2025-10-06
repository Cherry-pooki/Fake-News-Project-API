import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  headline: string;
  category: string;
  verdict: "Verified True" | "Fake News" | "Needs More Context";
  content: string;
  image: string;
}

const DUMMY_POSTS: BlogPost[] = [
  { id: 1, headline: "XXXXXXXXX", category: "General", verdict: "Verified True", content: "Verified true details here...", image: "/globe.svg" },
  { id: 2, headline: "XXXXXXXXX", category: "Politics", verdict: "Fake News", content: "Fake news details here...", image: "/window.svg" },
  { id: 3, headline: "XXXXXXXXX", category: "Technology", verdict: "Needs More Context", content: "Needs context details here...", image: "/file.svg" },
  { id: 4, headline: "XXXXXXXXX", category: "General", verdict: "Verified True", content: "Another verified story...", image: "/globe.svg" },
  { id: 5, headline: "XXXXXXXXX", category: "Politics", verdict: "Fake News", content: "This claim was debunked...", image: "/window.svg" },
  { id: 6, headline: "XXXXXXXXX", category: "Technology", verdict: "Needs More Context", content: "Partially accurate claim...", image: "/file.svg" },
  { id: 7, headline: "XXXXXXXXX", category: "General", verdict: "Verified True", content: "This article was confirmed by officials...", image: "/globe.svg" },
  { id: 8, headline: "XXXXXXXXX", category: "Politics", verdict: "Fake News", content: "No evidence supports this claim...", image: "/window.svg" },
  { id: 9, headline: "XXXXXXXXX", category: "Technology", verdict: "Needs More Context", content: "Experts said context is missing...", image: "/file.svg" },
];

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the Promise (fix for Next.js 15)
  const { id } = await params;

  const post = DUMMY_POSTS.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <p className="text-lg">❌ News not found.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition"
        >
          ← Back to homepage
        </Link>
      </div>
    );
  }

  const verdictColor =
    post.verdict === "Fake News"
      ? "text-red-600"
      : post.verdict === "Needs More Context"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header image */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={post.image}
            alt={post.headline}
            fill
            className="object-contain p-6"
          />
        </div>

        <div className="p-8">
          {/* Category and verdict */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className={`text-sm font-semibold ${verdictColor}`}>
              {post.verdict}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">
            {post.headline}
          </h1>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {post.content}
          </p>

          {/* Back button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
