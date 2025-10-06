import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
        <div>
          <p>Made By TrustMe Group</p>
          <p>For Web Application Development Using Framework Class</p>
        </div>
        <p className="mt-4">©TrustMe 2025</p>
      </footer>
    </div>
  );
};

export default Layout;