'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Dummy data structure
type Verdict = 'Verified True' | 'Fake News' | 'Needs More Context';

interface BlogPost {
  id: number;
  headline: string;
  category: string;
  verdict: Verdict;
  date: string;
}

// Helper function to format the date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const DUMMY_POSTS: BlogPost[] = [
  // ADDED DUMMY DATES to the posts
  { id: 1, headline: 'First Quarter Economic Report Analysis', category: 'General', verdict: 'Verified True', date: '2025-09-01' },
  { id: 2, headline: 'New Bill Proposed to Regulate AI', category: 'Politics', verdict: 'Fake News', date: '2025-09-05' },
  { id: 3, headline: 'Breakthrough in Fusion Energy Research', category: 'Technology', verdict: 'Needs More Context', date: '2025-09-10' },
  { id: 4, headline: 'Local Election Results Surprise Experts', category: 'General', verdict: 'Verified True', date: '2025-09-15' },
  { id: 5, headline: 'Global Trade Deal Signed By 50 Nations', category: 'Politics', verdict: 'Fake News', date: '2025-09-18' },
  { id: 6, headline: 'Innovative Water Filtration System Launched', category: 'Technology', verdict: 'Needs More Context', date: '2025-09-22' },
  { id: 7, headline: 'Annual Public Health Metrics Released', category: 'General', verdict: 'Verified True', date: '2025-09-25' },
  { id: 8, headline: 'Emergency Tax Measures Passed Today', category: 'Politics', verdict: 'Fake News', date: '2025-09-29' },
  { id: 9, headline: 'Next Generation Quantum Computer Unveiled', category: 'Technology', verdict: 'Needs More Context', date: '2025-10-02' },
];

// Define the filter options for clarity
const VERDICT_FILTERS: { label: string; verdict: Verdict; icon: string; }[] = [
  { label: 'Verified True', verdict: 'Verified True', icon: '✅' },
  { label: 'Fake News', verdict: 'Fake News', icon: '❌' },
  { label: 'Needs More Context', verdict: 'Needs More Context', icon: '⚠️' },
];

const BlogPage = () => {
   // State to track the currently active filter (null means show all)
   const [activeVerdict, setActiveVerdict] = useState<Verdict | null>(null);
   
   // State to track the date range (not implemented here, but ready)
   // const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Use useMemo to filter the posts efficiently whenever activeVerdict changes
  const filteredPosts = useMemo(() => {
    if (!activeVerdict) {
      return DUMMY_POSTS; // Show all if no filter is active
    }
    return DUMMY_POSTS.filter(post => post.verdict === activeVerdict);
  }, [activeVerdict]);


  const getButtonClasses = (buttonVerdict: Verdict) => {
    // Base classes for all buttons
    const baseClasses = "px-4 py-2 rounded-md font-medium transition duration-150";
    
    if (activeVerdict === buttonVerdict) {
      // Active class: teal background
      return `${baseClasses} bg-teal-600 text-white shadow-md`;
    } else {
      // Inactive class: gray background
      return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
    }
  };

  const handleFilterClick = (verdict: Verdict) => {
    // Toggle the filter: if the same button is clicked, reset the filter to null
    setActiveVerdict(current => current === verdict ? null : verdict);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className="flex flex-col pb-8">
        <div className="mb-6 flex space-x-4 items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          
          {/* Filter Buttons */}
          {VERDICT_FILTERS.map(filter => (
              <button 
                  key={filter.verdict}
                  onClick={() => handleFilterClick(filter.verdict)}
                  className={getButtonClasses(filter.verdict)}
              >
                  {filter.icon} {filter.label}
              </button>
          ))}

          {/* Date Filter (Simplified) */}
          <div className="ml-auto flex items-center space-x-2">
              <label htmlFor="from" className="text-gray-700 font-medium">From:</label>
              <input id="from" type="date" className="p-2 border border-teal-600 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"  />
              <label htmlFor="to" className="text-gray-700 font-medium">To:</label>
              <input id="to" type="date" className="p-2 border border-teal-600 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"  />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow container m-auto mb-0 mt-0 justify-center">
          {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{post.headline}</h3>
                          <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                              {post.category}
                          </span>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                          {/* Display the formatted date here */}
                          <p className="text-sm text-gray-500 mb-4">{formatDate(post.date)}</p>

                          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              {post.verdict}
                          </span>
                      </div>

                      {/* Placeholder Image Area */}
                      <div className="w-full h-32 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-4">
                            [Image Placeholder]
                      </div>

                      <Link
                          href={`/news/${post.id}`}
                          className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-150 text-center block"
                      >
                          Detail
                      </Link>
                  </div>
              ))
          ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                  No posts found for the selected filter.
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;