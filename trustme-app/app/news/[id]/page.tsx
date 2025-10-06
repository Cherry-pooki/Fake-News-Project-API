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
  {
    id: 1,
    headline: "Climate Experts Confirm Global Temperature Records",
    category: "General",
    verdict: "Verified True",
    content:
      "According to NASA and NOAA data, global temperatures have consistently reached record highs over the past five years. Scientists attribute this to human-caused greenhouse gas emissions. The report calls for urgent global action to meet climate targets and reduce fossil fuel dependency.",
    image: "/globe.svg",
  },
  {
    id: 2,
    headline: "Political Leader Claims 'Free Electricity for All'",
    category: "Politics",
    verdict: "Fake News",
    content:
      "This viral post was debunked by the Election Commission. No such policy exists in the official manifesto, and the candidate clarified that the statement was taken out of context. Readers are encouraged to verify claims using official government announcements.",
    image: "/window.svg",
  },
  {
    id: 3,
    headline: "AI Can Now Predict Natural Disasters",
    category: "Technology",
    verdict: "Needs More Context",
    content:
      "AI models are improving in pattern recognition for earthquakes and weather patterns. However, scientists note that 'prediction' is still not fully accurate — it’s better described as early detection or forecasting.",
    image: "/file.svg",
  },
];

interface NewsDetailProps {
  params: {
    id: string;
  };
}

export default function NewsDetail({ params }: NewsDetailProps) {
  const post = DUMMY_POSTS.find((p) => p.id === Number(params.id));

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
