'use client';

import React, { useState, useMemo } from 'react';

type Verdict = 'Verified True' | 'Fake News' | 'Needs More Context';

interface BlogPost {
  id: number;
  headline: string;
  category: string;
  verdict: Verdict;
  date: string;
  image?: string;
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Verdict colors
const getVerdictColorClasses = (verdict: Verdict) => {
  switch (verdict) {
    case 'Verified True':
      return 'text-green-700 bg-green-100 border-green-300';
    case 'Fake News':
      return 'text-red-700 bg-red-100 border-red-300';
    case 'Needs More Context':
      return 'text-amber-700 bg-amber-100 border-amber-300';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300';
  }
};

// Dummy data
const DUMMY_POSTS: BlogPost[] = [
  { id: 1, headline: 'Illinois sues to stop National Guard deployment as Trump escalates clash with states', category: 'World', verdict: 'Verified True', date: '2025-10-07', image: '/images/news1.jpg' },
  { id: 2, headline: 'McDavid signs two-year contract extension with Edmonton Oilers', category: 'Sports', verdict: 'Verified True', date: '2025-10-07', image: '/images/news2.jpg' },
  { id: 3, headline: 'White House says no shutdown-related layoffs yet, but warns they could come', category: 'Business', verdict: 'Verified True', date: '2025-10-06', image: '/images/news3.jpg' },
  { id: 4, headline: 'Image of ‘no manners’ Trump eating spaghetti during king’s speech is edited', category: 'Politics', verdict: 'Fake News', date: '2025-10-06', image: '/images/news4.jpg' },
  { id: 5, headline: 'Urgent! The third storm is headed towards Thailand via the North and Northeast.', category: 'Environment', verdict: 'Needs More Context', date: '2025-10-06', image: '/images/news5.webp' },
  { id: 6, headline: 'Child’s arrest for theft misrepresented as for waving England flag', category: 'Politics', verdict: 'Fake News', date: '2025-09-30', image: '/images/news6.jpg' },
  { id: 7, headline: 'Climate change and pollution threaten Europe’s resources, EU warns', category: 'Environment', verdict: 'Verified True', date: '2025-09-29', image: '/images/news7.jpg' },
  { id: 8, headline: 'Britain’s Starmer did not say Hamas can apply for London embassy', category: 'Politics', verdict: 'Fake News', date: '2025-09-29', image: '/images/news8.jpg' },
  { id: 9, headline: 'Bangkok sinks 1 cm per year. Heavy rains are clogging drainage and risking submersion by 2030', category: 'Environment', verdict: 'Needs More Context', date: '2025-09-27', image: '/images/news9.webp' },
  { id: 10, headline: 'Google AI presented my April Fools’ story as real news', category: 'Technology', verdict: 'Fake News', date: '2025-04-03', image: '/images/news10.jpg' },
  { id: 11, headline: 'False headline resurfaces to push COVID scam conspiracy', category: 'Health', verdict: 'Fake News', date: '2024-12-17', image: '/images/news11.jpg' },
  { id: 12, headline: 'Typo on display of Virginia voting equipment does not invalidate votes', category: 'General', verdict: 'Needs More Context', date: '2024-11-06', image: '/images/news12.jpg' },
];

// Verdict Buttons Data
const VERDICT_FILTERS: { label: string; verdict: Verdict; icon: string }[] = [
  { label: 'Verified True', verdict: 'Verified True', icon: '✅' },
  { label: 'Fake News', verdict: 'Fake News', icon: '❌' },
  { label: 'Needs More Context', verdict: 'Needs More Context', icon: '⚠️' },
];

const BlogPage = () => {
  // Filter states
  const [activeVerdict, setActiveVerdict] = useState<Verdict | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const uniqueCategories = useMemo(
    () => ['All', ...Array.from(new Set(DUMMY_POSTS.map((p) => p.category)))].sort(),
    []
  );

  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return DUMMY_POSTS.filter((post) => {
      const verdictMatch = !activeVerdict || post.verdict === activeVerdict;
      const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
      const searchMatch =
        !searchTerm || post.headline.toLowerCase().includes(searchTerm.toLowerCase());

      const postDate = new Date(post.date);
      const fromMatch = !fromDate || postDate >= new Date(fromDate);
      const toMatch = !toDate || postDate <= new Date(toDate);

      return verdictMatch && categoryMatch && searchMatch && fromMatch && toMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeVerdict, activeCategory, searchTerm, fromDate, toDate]);

  // Button styling
  const getButtonClasses = (isActive: boolean) => {
    const baseClasses =
      'px-4 py-2 rounded-md font-medium transition duration-150 flex items-center gap-1';
    return isActive
      ? `${baseClasses} bg-teal-600 text-white shadow-md`
      : `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  // Verdict Button Click
  const handleVerdictFilterClick = (verdict: Verdict) => {
    setActiveVerdict((current) => (current === verdict ? null : verdict));
  };

  const isVerdictButtonActive = (verdict: Verdict) => activeVerdict === verdict;

  // JSX
  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-teal-800">
          Fact-Checked <span className="text-gray-500 text-2xl">| Blog Posts</span>
        </h1>

        {/* Filter Bar */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Verdict Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {VERDICT_FILTERS.map((filter) => (
              <button
                key={filter.verdict}
                onClick={() => handleVerdictFilterClick(filter.verdict)}
                className={getButtonClasses(isVerdictButtonActive(filter.verdict))}
              >
                <span>{filter.icon}</span> <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium whitespace-nowrap">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full md:w-auto"
            />
            <span className="text-gray-700 font-medium whitespace-nowrap">To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full md:w-auto"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const verdictClasses = getVerdictColorClasses(post.verdict);
              const categoryClasses = 'text-blue-700 bg-blue-100 border-blue-300';

              return (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Image */}
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.headline}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/600x400/CCCCCC/666666?text=News+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-4 rounded-lg">
                      [Image Placeholder]
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap border ${verdictClasses}`}
                    >
                      {post.verdict}
                    </span>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryClasses}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex-grow">
                    {post.headline}
                  </h3>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                    <a
                      href={`/news/${post.id}`}
                      className="py-1 px-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-150 text-center text-sm font-semibold"
                    >
                      Detail
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No posts found matching your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
