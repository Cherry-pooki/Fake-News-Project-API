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
  image?: string;
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
  { id: 1, headline: 'Illinois sues to stop National Guard deployment as Trump escalates clash with states', category: 'World', verdict: 'Verified True', date: '2025-10-07', image: '/images/news1.jpg' },
  { id: 2, headline: 'McDavid signs two-year contract extension with Edmonton Oilers', category: 'Sports', verdict: 'Verified True', date: '2025-10-07', image: '/images/news2.jpg' },
  { id: 3, headline: 'White House says no shutdown-related layoffs yet, but warns they could come', category: 'Business', verdict: 'Verified True', date: '2025-10-06', image: '/images/news3.jpg' },
  { id: 4, headline: 'Image of ‘no manners’ Trump eating spaghetti during king’s speech is edited', category: 'Politics', verdict: 'Fake News', date: '2025-10-06', image: '/images/news4.jpg' },
  { id: 5, headline: 'Urgent! The third storm is headed towards Thailand via the North and Northeast.', category: 'Environment', verdict: 'Needs More Context', date: '2025-10-06', image: '/images/news5.webp' },
  { id: 6, headline: 'IChild’s arrest for theft misrepresented as for waving England flag', category: 'Politics', verdict: 'Fake News', date: '2025-09-30', image: '/images/news6.jpg' },
  { id: 7, headline: 'Climate change and pollution threaten Europe’s resources, EU warns', category: 'Environment', verdict: 'Verified True', date: '2025-09-29', image: '/images/news7.jpg' },
  { id: 8, headline: 'Britain’s Starmer did not say Hamas can apply for London embassy', category: 'Politics', verdict: 'Fake News', date: '2025-09-29', image: '/images/news8.jpg' },
  { id: 9, headline: 'Bangkok sinks 1 cm per year. Heavy rains are clogging drainage and risking submersion by 2030', category: 'Environment', verdict: 'Needs More Context', date: '2025-09-27', image: '/images/news9.webp' },
  { id: 10, headline: 'Google AI presented my April Fools’ story as real news', category: 'Technology', verdict: 'Fake News', date: '2025-04-03', image: '/images/news10.jpg' },
  { id: 11, headline: 'False headline resurfaces to push COVID scam conspiracy', category: 'Health', verdict: 'Fake News', date: '2024-12-17', image: '/images/news11.jpg' },
  { id: 12, headline: 'Typo on display of Virginia voting equipment does not invalidate votes', category: 'General', verdict: 'Needs More Context', date: '2024-11-06', image: '/images/news12.jpg' },
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
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.headline}
                          className="w-full h-32 object-cover rounded mb-4"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-4">
                          [Image Placeholder]
                        </div>
                      )}

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