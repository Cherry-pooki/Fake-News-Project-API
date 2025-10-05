'use client';

import React, { useState } from 'react';

// Define result states
type Verdict = 'unset' | 'true' | 'false' | 'misleading';

export default function FactCheckPage() {
  const [query, setQuery] = useState('');
  const [verdict, setVerdict] = useState<Verdict>('unset');
  const [percentage, setPercentage] = useState(0);

  // Placeholder for the actual API call
  const handleFactCheck = async () => {
    // In a real app, you'd call your Next.js API route here
    
    // Simulating API response delay and random result
    setVerdict('unset');
    setPercentage(0);

    // Simulate loading for 1.5s
    await new Promise(resolve => setTimeout(resolve, 1500)); 
        
    const isTrue = Math.random() > 0.5;
    const newPercentage = Math.floor(Math.random() * 20) + 60; // 60-80%
    
    if (isTrue) {
        setVerdict('true');
        setPercentage(newPercentage);
    } else {
        setVerdict('false');
        setPercentage(newPercentage);
    }
  };

  const renderResult = () => {
    if (verdict === 'unset') return null;

    let bgColor, barColor, text;
    
    if (verdict === 'true') {
        bgColor = 'bg-green-50';
        barColor = 'bg-green-500';
        text = `${percentage}% True`; 
    } else if (verdict === 'false' || verdict === 'misleading') {
        bgColor = 'bg-red-50';
        barColor = 'bg-red-500';
        text = `${percentage}% False`; // Updated to use percentage
    } else {
        return null;
    }

    return (
      <div className={`mt-8 p-6 rounded-lg shadow-lg ${bgColor} border border-gray-200`}>
        <h3 className="text-xl font-bold mb-4">Fact Check Result:</h3>
        
        <div className="text-gray-700 mb-3">
            <p>"{query}"</p>
            <p>XXXXXXXXXXXX</p>
        </div>

        {/* Verdict Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-700 ease-out ${barColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        {/* Verdict Text */}
        <div className="flex justify-between items-center">
            <p className="font-semibold text-lg text-gray-800">
                {verdict === 'true' ? '✅ Verified True' : '❌ Fake News'} 
            </p>
            <span className={`text-lg font-bold ${verdict === 'true' ? 'text-green-600' : 'text-red-600'}`}>
                {text}
            </span>
        </div>

        {/* Source and Related Links Section */}
        <div className="mt-6 pt-4 border-t border-gray-300">
            <p className="text-sm font-medium text-gray-600 mb-2">
                Verified by **Google Fact Check Explorer** and **Reuters Fact-Check**.
            </p>
            <p className="text-sm text-gray-500">
                Related fact-check articles: 
                <a href="#" className="text-teal-600 hover:underline ml-1">Link 1,</a>
                <a href="#" className="text-teal-600 hover:underline ml-1">Link 2.</a>
            </p>
        </div>

      </div>
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">Fact Check</h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-2xl border border-teal-200">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Paste Headline or URL here."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
          />
          <button
            onClick={handleFactCheck}
            disabled={!query}
            className="bg-teal-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-700 transition duration-150 disabled:opacity-50"
          >
            Check
          </button>
        </div>

        {renderResult()}
      </div>
    </>
  );
}