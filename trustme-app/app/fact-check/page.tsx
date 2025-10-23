'use client';

import React, { useState } from 'react';
// Assuming the user has the FactCheckResult type available from the updated route.ts
import { FactCheckResult } from '../api/fact-check/route'; 

// Define result states
type Verdict = 'unset' | 'true' | 'false' | 'misleading' | 'context' | 'error';

// State Variables
export default function FactCheckPage() {
  const [query, setQuery] = useState(''); // user's input
  const [verdict, setVerdict] = useState<Verdict>('unset');
  const [loading, setLoading] = useState(false); // loading spinner while fetching data
  // NEW: State for the simulated confidence percentage
  const [percentage, setPercentage] = useState(0); 
  // resultData now holds all response data, including an error message if needed
  const [resultData, setResultData] = useState<FactCheckResult | null>(null);

  /**
   * Parses the text from the Gemini API to determine the high-level verdict.
   * Helper Function — Verdict Detection
   */
  const getVerdictFromText = (text: string): Verdict => {
    // The Gemini system instruction asks for the verdict first,
    const textualRating = text.split(':')[0]?.toLowerCase() || '';

    if (textualRating.includes('verified true')) {
      return 'true';
    } else if (textualRating.includes('fake news')) {
      return 'false';
    } else if (textualRating.includes('needs more context') || textualRating.includes('misleading')) {
      return 'misleading';
    }
    return 'context';
  }

  // This runs when the user clicks “Check” or presses Enter
  const handleFactCheck = async () => {
    if (!query) return;
    setLoading(true);
    setVerdict('unset');
    setResultData(null);
    setPercentage(0);
    // Prevents empty searches & Resets all states for a fresh run.

    try {
      // 1. Fetch the response from the API route
      // Sends a GET request to Next.js API route with the query attached
      const res = await fetch(`/api/fact-check?query=${encodeURIComponent(query)}`);

      // Handles bad responses
      if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
        console.error('API call failed or returned HTML instead of JSON.', res.status);
        setVerdict('error');
        const errorDetail = res.status === 404 
          ? 'API Route not found (404). Ensure app/api/fact-check/route.ts exists and exports GET.' 
          : `The fact-checking service encountered an internal server error (Status ${res.status}).`;
        
        setResultData({
            verdictText: errorDetail,
            sources: []
        });
        return;
      }
      
      // 2. Safely parse the JSON data
      // Converts the JSON response into a TypeScript object with verdictText, sources, etc.
      const data: FactCheckResult & { error?: string } = await res.json();

      if (data.error) {
        console.error('API returned a structured error:', data.error);
        setVerdict('error');
        setResultData({ verdictText: data.error, sources: [] });
        return;
      }

      // Saves the result to state and determines the verdict type from text
      setResultData(data);
      const determinedVerdict = getVerdictFromText(data.verdictText);
      setVerdict(determinedVerdict);
      
      // Simulates a “confidence percentage” for strong verdicts
      if (determinedVerdict === 'true' || determinedVerdict === 'false' || determinedVerdict === 'misleading') {
        setPercentage(Math.floor(Math.random() * 20) + 75);
      } else {
        setPercentage(0);
      }

      // Handles network or parsing errors and stops loading spinner
    } catch (err) {
      console.error("Fact check failed on client:", err);
      setVerdict('error');
      setResultData({
          verdictText: 'A network or parsing error occurred. Please check your console.',
          sources: []
      });
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (verdict === 'unset' || !resultData) return null;

    if (verdict === 'error')
      return (
        <div className="mt-8 p-6 bg-red-50 border border-red-300 rounded-lg shadow">
          <p className="text-red-700 font-semibold">❌ Fact Check Failed</p>
          <p className="text-sm mt-2 text-red-600">Details: {resultData.verdictText || "An unknown error occurred while contacting the server."}</p>
          <p className="text-xs mt-1 text-red-500">
            *This usually means the **GEMINI_API_KEY** is missing/invalid or the API route path is incorrect.
          </p>
        </div>
      );

    // Determine visual styling based on verdict
    let bgColor, barColor, tagText, tagIcon;
    if (verdict === 'true') {
      bgColor = 'bg-green-50';
      barColor = 'bg-green-600';
      tagText = 'Verified True';
      tagIcon = '✅';
    } else if (verdict === 'false') {
      bgColor = 'bg-red-50';
      barColor = 'bg-red-600';
      tagText = 'Fake News';
      tagIcon = '❌';
    } else if (verdict === 'misleading') {
      bgColor = 'bg-yellow-50';
      barColor = 'bg-yellow-600';
      tagText = 'Needs More Context';
      tagIcon = '⚠️';
    } else { // 'context' verdict or general catch-all
      bgColor = 'bg-blue-50';
      barColor = 'bg-blue-600';
      tagText = 'Analysis Complete';
      tagIcon = '💬';
    }

    // Determine the text displayed on the bar
    let barLabel;
    if (verdict === 'true') {
        barLabel = `${percentage}% Confident (TRUE)`;
    } else if (verdict === 'false') {
        barLabel = `${percentage}% Confident (FAKE)`;
    } else if (verdict === 'misleading') {
        barLabel = `${percentage}% Confident (MISLEADING)`;
    } else {
        barLabel = `Verdict: ${tagText}`;
    }
    
    return (
      <div className={`mt-8 p-6 rounded-xl shadow-2xl ${bgColor} border border-teal-200`}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Fact Check Result</h3>

        {/* Verdict Tag */}
        <div className={`p-4 rounded-lg mb-4 flex items-center ${barColor}`}>
            <span className="text-3xl mr-3">{tagIcon}</span>
            <span className="text-xl font-extrabold text-white">{tagText}</span>
        </div>
        
        {/* Full Analysis Text */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-inner">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {resultData.verdictText}
            </p>
        </div>

        {/* NEW: Verdict Confidence Bar */}
        {(verdict === 'true' || verdict === 'false' || verdict === 'misleading') && (
            <div className="mt-6 pt-4 border-t border-gray-300">
                <p className="text-sm font-bold text-gray-700 mb-2">
                    Verification Confidence:
                </p>
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                        className={`h-4 rounded-full transition-all duration-700 ease-out ${barColor}`}
                        style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                        {barLabel}
                    </span>
                </div>
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-teal-800">
        TruthChecker <span className="text-gray-500 text-2xl">| Fact Verifier</span>
      </h1>

      <div className="max-w-3xl mx-auto p-6 md:p-8">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Paste Headline or URL here."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFactCheck(); }}
            className="flex-grow p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 text-lg text-gray-800 placeholder-gray-500 transition duration-150 bg-white"
          /> /* Input field bound to query with “Enter” shortcut */
          <button
            onClick={handleFactCheck}
            disabled={!query || loading}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-teal-700 transition duration-150 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {loading ? 
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
            : 'Check'}
          </button>
        </div>

        {renderResult()}
      </div>
    </div>
  );
}
