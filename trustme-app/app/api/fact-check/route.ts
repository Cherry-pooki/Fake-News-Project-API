// --- Configuration ---
// The API Key will be read from the environment variables (.env.local)
const API_KEY = process.env.GEMINI_API_KEY; 
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

// --- Types ---
export type FactCheckResult = {
    verdictText: string;
    sources: Array<{ title: string; uri: string }>;
    error?: string;
};

// --- Fact-Checking Logic ---

/**
 * Calls the Gemini API with search grounding to perform a fact-check analysis.
 */
const fetchFactCheckData = async (query: string): Promise<FactCheckResult> => {
    if (!API_KEY) {
        throw new Error('GEMINI_API_KEY is missing. Check your environment variables.');
    }

    // System instruction guides the model's output to meet front-end requirements
    const systemPrompt = `You are a neutral, highly reliable fact-checking assistant. Analyze the user's query (headline or link) using Google Search.
    Provide a verdict ONLY from the set: 'Verified True', 'Fake News', or 'Needs More Context'.
    Start your response with the chosen verdict (e.g., 'Verified True:'), followed by a single paragraph summarizing the finding. 
    State clearly that the verification was done using Google Search or reliable sources. Do not include any preambles or greetings.`;

    const payload = {
        contents: [{ parts: [{ text: query }] }],
        // This tool enables the model to use real-time Google Search results
        tools: [{ "google_search": {} }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };
    
    // Construct the URL with the API key
    const url = `${GEMINI_API_URL}?key=${API_KEY}`;
    
    const apiResponse = await fetch(url, {
        method: 'POST', // The Gemini API requires a POST request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
        // Handle network or API internal errors
        const errorText = await apiResponse.text();
        console.error('Gemini API Error:', apiResponse.status, errorText);
        throw new Error(`Gemini API failed with status: ${apiResponse.status}. (Check if GEMINI_API_KEY is valid)`);
    }

    const data = await apiResponse.json();
    const candidate = data.candidates?.[0];
    const verdictText = candidate?.content?.parts?.[0]?.text;

    if (!verdictText) {
        throw new Error('Gemini API returned an invalid response structure.');
    }

    // 1. Extract grounding sources (citations)
    let sources: FactCheckResult['sources'] = [];
    const groundingMetadata = candidate.groundingMetadata;
    if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
            .map((attribution: { web?: { uri?: string; title?: string } }) => ({
                uri: attribution.web?.uri || '',
                title: attribution.web?.title || 'Untitled Source',
            }))
            .filter((source: { uri: string; title: string }): source is { uri: string; title: string } => !!source.uri); // Only keep sources with a URI
    }
    
    return {
        verdictText: verdictText,
        sources: sources,
    };
};

// --- API Route Handler ---

export async function GET(req: Request) {
  try {
    // 1. Get the URLSearchParams object
    const { searchParams } = new URL(req.url);
    
    // 2. Extract the 'query' parameter
    const query = searchParams.get('query');

    if (!query || query.trim().length === 0) {
      // Respond with a structured error
      return Response.json({ error: 'Missing search query.' }, { status: 400 });
    }

    // Call the core logic
    const result: FactCheckResult = await fetchFactCheckData(query);
    
    // Return the result
    return Response.json(result, { status: 200 });

  } catch (error) {
    // Log the detailed error on the server side
    console.error('Fact check failed:', error);
    
    // Return a generic internal server error
    return Response.json({ error: (error as Error).message || 'Internal server error during fact-check process.' }, { status: 500 });
  }
}
