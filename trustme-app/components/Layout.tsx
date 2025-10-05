import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
        <p>Made By TrustMe Groups</p>
        <p>Contact: XXXXXX | Address: XXXXXX | Privacy: 2025</p>
      </footer>
    </div>
  );
};

export default Layout;