'use client'; // <-- Necessary for using hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- Import the hook

const Header = () => {
  // Get the current URL path
  const pathname = usePathname();

  // Define base and active classes
  const baseClass = "px-3 py-1 mx-3 my-1 rounded-md font-medium transition duration-150";
  const activeClass = "text-teal-600 bg-white hover:bg-gray-100 shadow-md";
  const inactiveClass = "text-white hover:text-teal-200";

  // Determine if the current path matches the link's href
  const isBlogActive = pathname === '/';
  const isFactCheckActive = pathname.startsWith('/fact-check'); // Use startsWith to handle potential sub-paths

  return (
    <header className="bg-teal-600 p-4 shadow-md">
      <div className="container mx-8 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          TrustMe
        </Link>
        <nav className="space-x-4 mr-4">
          <Link 
            href="/" 
            className={`${baseClass} ${isBlogActive ? activeClass : inactiveClass}`}
          >
            News Blog
          </Link>
          <Link
            href="/fact-check"
            className={`${baseClass} ${isFactCheckActive ? activeClass : inactiveClass}`}
          >
            Fact Check
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;