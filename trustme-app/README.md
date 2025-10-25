# 🧠 TrustMe — Anti-Fake News Website

**TrustMe** is a simple, fast, and user-friendly web app designed to help people verify the truthfulness of online news.  
It provides fact-checked blog posts and a real-time fact-checking tool powered by **Google’s Gemini API**.

---

## 🚀 Features

- 📰 **Blog Page:** Browse fact-checked articles  
  - Filter by category or date  
  - View verdict tags (✅ True, ❌ False, ⚠ Context Needed)

- 🔍 **Fact Check Page:**  
  - Paste any news headline or link  
  - App sends the query to Gemini API  
  - Displays verified verdict and confidence level

- ⚡ **Powered by Google Gemini API:**  
  Fetches live web results and generates reliable verification.

---

## 🧩 System Architecture

**Frontend (Next.js / React)**  
- `/app/page.tsx` — Blog homepage  
- `/app/fact-check/page.tsx` — Fact checker page  
- `/app/news/[id]/page.tsx` — Detailed blog post page  
- `/app/globals.css` — Global styling  

**Backend (API Route)**  
- `/app/api/fact-check/route.ts`  
  - Receives the query from client  
  - Sends it to Gemini API (with `google_search` tool)  
  - Returns structured verdict result  

**Environment Variable:**  
`GEMINI_API_KEY` — Required to access the Gemini model via Google Cloud Vertex AI  

**Deployment:**  
Ideal for **Vercel** or other serverless hosting platforms.

---

## 🌐 The API (Data Source)

TrustMe uses **Google’s Gemini API (Generative Language API)** as its main fact-checking data source.  
It is managed under **Google Cloud Vertex AI / AI Studio**.

- **Model name:** `gemini-2.5-flash-preview-09-2025`  
- **Tools used:** `google_search` — enables live search for news verification  
- **Fetched data:**  
  - Article headline  
  - Claim review and reasoning  
  - Verdict (`true`, `false`, `misleading`, `context`)  
  - Verified source URLs  

The system prompt ensures Gemini behaves as a professional fact-checker, always starting the response with phrases like **"Verified True:"** or **"Verified False:"**, ensuring consistency and reliability.

---

## ⚙️ Installation and Setup

Follow these steps to run **TrustMe** locally:

### 1. Clone the Project
```bash
git clone https://github.com/Cherry-pooki/Fake-News-Project-API.git
cd Fake-News-Project-API
cd trustme-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a new file named **`.env.local`** in the project root directory and add:
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

You can get this key from your [Google AI Studio / Vertex AI](https://aistudio.google.com/).

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

To deploy to **Vercel**:
1. Push your project to GitHub.
2. Go to [Vercel](https://vercel.com/) → *Import Project*.
3. Add the environment variable `GEMINI_API_KEY` under *Settings > Environment Variables*.
4. Deploy — your site will be live in seconds!

---

## 📁 Folder Structure
```
trustme/
├── app/
│   ├── api/
│   │   └── fact-check/
│   │       └── route.ts
│   ├── fact-check/
│   │   └── page.tsx
│   ├── news/
│   │   └── [id]/page.tsx
│   ├── globals.css
│   └── page.tsx
├── public/
│   └── images/
├── package.json
└── .env.local
```

---

## 👩‍💻 Authors

- **Chit Pont Pont Cherry** (66070327)  
- **Khokwan Tachaongart** (66070333)

---

## 🧾 License
This project is for **educational and non-commercial** use only.  
All API keys must be kept private.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
