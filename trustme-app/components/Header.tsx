import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-teal-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          TrustMe
        </Link>
        <nav className="space-x-4">
          <Link href="/blog" className="text-white hover:text-teal-200">
            News Blog
          </Link>
          <Link
            href="/fact-check"
            className="text-teal-600 bg-white px-3 py-1 rounded-md font-medium hover:bg-gray-100"
          >
            Fact Check
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;