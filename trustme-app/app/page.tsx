import Layout from '../components/Layout';
import React from 'react';
import Link from "next/link";

// Dummy data structure
interface BlogPost {
  id: number;
  headline: string;
  category: string;
  verdict: 'Verified True' | 'Fake News' | 'Needs More Context';
}

const DUMMY_POSTS: BlogPost[] = [
  // ... 9 dummy posts for the grid ...
  { id: 1, headline: 'XXXXXXXXX', category: 'General', verdict: 'Verified True' },
  { id: 2, headline: 'XXXXXXXXX', category: 'Politics', verdict: 'Fake News' },
  { id: 3, headline: 'XXXXXXXXX', category: 'Technology', verdict: 'Needs More Context' },
  { id: 4, headline: 'XXXXXXXXX', category: 'General', verdict: 'Verified True' },
  { id: 5, headline: 'XXXXXXXXX', category: 'Politics', verdict: 'Fake News' },
  { id: 6, headline: 'XXXXXXXXX', category: 'Technology', verdict: 'Needs More Context' },
  { id: 7, headline: 'XXXXXXXXX', category: 'General', verdict: 'Verified True' },
  { id: 8, headline: 'XXXXXXXXX', category: 'Politics', verdict: 'Fake News' },
  { id: 9, headline: 'XXXXXXXXX', category: 'Technology', verdict: 'Needs More Context' },
];

const BlogPage = () => {
  return (
    <Layout>
      <div className="mb-6 flex space-x-4 items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Filter Buttons */}
        <button className="px-4 py-2 bg-teal-600 text-white rounded-md font-medium">
          ✅ Verified True
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          ❌ Fake News
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          ⚠️ Needs More Context
        </button>

        {/* Date Filter (Simplified) */}
        <div className="ml-auto flex items-center space-x-2">
          <label htmlFor="from">From:</label>
          <input id="from" type="date" className="p-2 border rounded-md" />
          <label htmlFor="to">To:</label>
          <input id="to" type="date" className="p-2 border rounded-md" />
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DUMMY_POSTS.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{post.headline}</h3>
              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                {post.verdict}
              </span>
            </div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-500 mb-4">Summary/timestamp</p>
              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">Summary/timestamp</p>

            {/* Placeholder Image Area */}
            <div className="w-full h-32 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-4">
              [Image Placeholder]
            </div>

            <Link href={`/news/${post.id}`}>
              <button className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-150">
                Detail
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;