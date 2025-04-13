import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { notificationService } from '../../services';
import { Button, DarkModeToggle } from '../ui';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    notificationService
      .confirm('Logout', 'Are you sure you want to logout?', 'Yes, logout', 'Cancel')
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          notificationService.toast('Logged out successfully');
          navigate('/');
        }
      });
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Raabta</span>
            </div>
            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/contacts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/contact')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:border-gray-500'
                } text-sm font-medium`}
              >
                Contacts
              </Link>
              <Link
                to="/interactions"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/interaction')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:border-gray-500'
                } text-sm font-medium`}
              >
                Interactions
              </Link>
              <Link
                to="/reports"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/reports')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:border-gray-500'
                } text-sm font-medium`}
              >
                Reports
              </Link>
            </div>
          </div>

          {/* User menu and mobile menu button */}
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <DarkModeToggle />
              <div className="flex items-center space-x-3 border-r border-gray-300 dark:border-gray-600 pr-3 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-white">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {username}
                </span>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <DarkModeToggle className="mr-2" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-blue-400"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay - placing it before the sliding panel so it appears behind the panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 z-30 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile menu - Sliding panel */}
      <div
        className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-16 left-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-800 z-40 transform transition-transform duration-300 ease-in-out shadow-lg border-r border-gray-200 dark:border-gray-700 overflow-y-auto sm:hidden`}
      >
        <div className="pt-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-white text-lg font-medium">
                {username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                {username}
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/contacts"
            className={`block px-3 py-4 rounded-md text-base font-medium ${
              isActive('/contact')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacts
          </Link>
          <Link
            to="/interactions"
            className={`block px-3 py-4 rounded-md text-base font-medium ${
              isActive('/interaction')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Interactions
          </Link>
          <Link
            to="/reports"
            className={`block px-3 py-4 rounded-md text-base font-medium ${
              isActive('/reports')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reports
          </Link>
        </div>

        <div className="pt-4 px-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
