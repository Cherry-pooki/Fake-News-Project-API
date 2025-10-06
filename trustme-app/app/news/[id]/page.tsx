"use client";
import React, { useEffect, useState } from "react";
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
    headline: "XXXXXXXXX",
    category: "General",
    verdict: "Verified True",
    content:
      "This article explains how verified information is fact-checked and confirmed through reliable sources.",
    image: "/globe.svg",
  },
  {
    id: 2,
    headline: "XXXXXXXXX",
    category: "Politics",
    verdict: "Fake News",
    content:
      "This article was found to be misleading. Verification by multiple sources shows it contains false claims.",
    image: "/window.svg",
  },
  {
    id: 3,
    headline: "XXXXXXXXX",
    category: "Technology",
    verdict: "Needs More Context",
    content:
      "Some claims are partially correct but lack important background information or data context.",
    image: "/file.svg",
  },
  {
    id: 4,
    headline: "XXXXXXXXX",
    category: "General",
    verdict: "Verified True",
    content:
      "Independent checks confirm this event actually occurred as described in official reports.",
    image: "/globe.svg",
  },
  {
    id: 5,
    headline: "XXXXXXXXX",
    category: "Politics",
    verdict: "Fake News",
    content:
      "This political claim has been publicly debunked and confirmed false by independent organizations.",
    image: "/window.svg",
  },
  {
    id: 6,
    headline: "XXXXXXXXX",
    category: "Technology",
    verdict: "Needs More Context",
    content:
      "This news involves some truth but the details are simplified. Experts suggest reading full research reports.",
    image: "/file.svg",
  },
  {
    id: 7,
    headline: "XXXXXXXXX",
    category: "General",
    verdict: "Verified True",
    content:
      "Multiple fact-checking bodies have reviewed and verified this information as accurate.",
    image: "/globe.svg",
  },
  {
    id: 8,
    headline: "XXXXXXXXX",
    category: "Politics",
    verdict: "Fake News",
    content:
      "This rumor spread online but has been proven false by government or reputable sources.",
    image: "/window.svg",
  },
  {
    id: 9,
    headline: "XXXXXXXXX",
    category: "Technology",
    verdict: "Needs More Context",
    content:
      "Experts state this claim requires additional technical explanation to be fully understood.",
    image: "/file.svg",
  },
];

interface NewsDetailProps {
  params: { id: string };
}

export default function NewsDetail({ params }: NewsDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = DUMMY_POSTS.find((p) => p.id === Number(params.id));
    setTimeout(() => {
      setPost(foundPost || null);
      setLoading(false);
    }, 200);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading article...
      </div>
    );
  }

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
