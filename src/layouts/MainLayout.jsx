import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/navBar/NavBar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {!isAuthPage && <NavBar />}
      <main className="flex-grow p-4 md:p-6 container mx-auto max-w-7xl">
        <div className="h-full">{children}</div>
      </main>
      {!isAuthPage && (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Raabta. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
