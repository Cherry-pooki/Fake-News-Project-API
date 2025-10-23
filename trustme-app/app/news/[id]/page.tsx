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
  date: string;
}

// verdict colors
const getVerdictColorClasses = (verdict: BlogPost["verdict"]) => {
  switch (verdict) {
    case "Verified True":
      return "text-green-700 bg-green-100 border-green-300";
    case "Fake News":
      return "text-red-700 bg-red-100 border-red-300";
    case "Needs More Context":
      return "text-amber-700 bg-amber-100 border-amber-300";
    default:
      return "text-gray-700 bg-gray-100 border-gray-300";
  }
};

// --- Dummy data ---
const DUMMY_POSTS: BlogPost[] = [
  { id: 1, headline: 'Illinois sues to stop National Guard deployment as Trump escalates clash with states', category: 'World', verdict: 'Verified True', date: '2025-10-07', image: '/images/news1.jpg',
    content: `In a significant legal move, Illinois has filed a lawsuit to prevent the deployment of the National Guard within its borders. This action comes as tensions escalate between the Trump administration and various states over the use of federal forces for domestic issues.`,
  },
  { id: 2, headline: 'McDavid signs two-year contract extension with Edmonton Oilers', category: 'Sports', verdict: 'Verified True', date: '2025-10-07', image: '/images/news2.jpg',
    content: `In a surprising turn of events, Connor McDavid has signed a two-year contract extension with the Edmonton Oilers, ensuring that the star player will remain with the team through the 2027 season.`,
  },
  { id: 3, headline: 'White House says no shutdown-related layoffs yet, but warns they could come', category: 'Business', verdict: 'Verified True', date: '2025-10-06', image: '/images/news3.jpg',
    content: `The White House has announced that there are currently no layoffs related to the government shutdown, but officials are warning that such measures could be necessary if the impasse continues.`,
  },
  { id: 4, headline: 'Image of ‘no manners’ Trump eating spaghetti during king’s speech is edited', category: 'Politics', verdict: 'Fake News', date: '2025-10-06', image: '/images/news4.jpg',
    content: `An image purportedly showing former President Trump eating spaghetti during a speech by a foreign leader has been revealed as a doctored photo.`,
  },
  { id: 5, headline: 'Urgent! The third storm is headed towards Thailand via the North and Northeast.', category: 'Environment', verdict: 'Needs More Context', date: '2025-10-06', image: '/images/news5.webp',
    content: `Meteorologists are tracking a third storm system that is expected to impact Thailand in the coming days.`,
  },
  { id: 6, headline: 'Child’s arrest for theft misrepresented as for waving England flag', category: 'Politics', verdict: 'Fake News', date: '2025-09-30', image: '/images/news6.jpg',
    content: `Reports claiming that a child's arrest for theft was actually due to waving an England flag have been debunked.`,
  },
  { id: 7, headline: 'Climate change and pollution threaten Europe’s resources, EU warns', category: 'Environment', verdict: 'Verified True', date: '2025-09-29', image: '/images/news7.jpg',
    content: `The European Union has issued a stark warning about the impacts of climate change and pollution on the continent's natural resources.`,
  },
  { id: 8, headline: 'Britain’s Starmer did not say Hamas can apply for London embassy', category: 'Politics', verdict: 'Fake News', date: '2025-09-29', image: '/images/news8.jpg',
    content: `Claims that Labour leader Keir Starmer stated Hamas could apply for a London embassy have been proven false.`,
  },
  { id: 9, headline: 'Bangkok sinks 1 cm per year. Heavy rains are clogging drainage and risking submersion by 2030', category: 'Environment', verdict: 'Needs More Context', date: '2025-09-27', image: '/images/news9.webp',
    content: `Bangkok is facing a serious threat from rising water levels, with experts warning that the city could be submerged by 2030.`,
  },
  { id: 10, headline: 'Google AI presented my April Fools’ story as real news', category: 'Technology', verdict: 'Fake News', date: '2025-04-03', image: '/images/news10.jpg',
    content: `A user has reported that Google AI mistakenly identified their April Fools' Day story as genuine news.`,
  },
  { id: 11, headline: 'False headline resurfaces to push COVID scam conspiracy', category: 'Health', verdict: 'Fake News', date: '2024-12-17', image: '/images/news11.jpg',
    content: `A misleading headline related to COVID-19 has resurfaced, being used to promote a conspiracy theory.`,
  },
  { id: 12, headline: 'Typo on display of Virginia voting equipment does not invalidate votes', category: 'General', verdict: 'Needs More Context', date: '2024-11-06', image: '/images/news12.jpg',
    content: `A typo found on the display of Virginia's voting equipment has raised concerns, but officials state it does not affect the validity of the votes cast.`,
  }
];

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the Promise (Next.js 15)
  const { id } = await params;
  const post = DUMMY_POSTS.find((p) => p.id === Number(id));

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

  const categoryClasses = "text-blue-700 bg-blue-100 border-blue-300";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header image */}
        <div className="w-full flex justify-center bg-gray-100 py-6">
          <Image
            src={post.image}
            alt={post.headline}
            width={600}
            height={300}
            className="rounded-xl object-cover shadow"
            priority
          />
        </div>

        <div className="p-8">
          {/* ✅ Tags (same as blog page style) */}
          <div className="flex justify-between items-center mb-5">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap border ${getVerdictColorClasses(
                post.verdict
              )}`}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">
            {post.headline}
          </h1>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {post.content}
          </p>

          {/* Back button */}
          <div className="mt-10 text-center">
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
