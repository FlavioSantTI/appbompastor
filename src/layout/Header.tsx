
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full flutter-gradient flex items-center justify-center text-white font-bold text-xl">M</div>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white hidden sm:block">Matrimony Flow</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-white hover:text-flutter-primary dark:hover:text-flutter-primary">Início</Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-flutter-primary dark:hover:text-flutter-primary">Dashboard</Link>
            <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-flutter-primary dark:hover:text-flutter-primary">Login</Link>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-flutter-primary hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-flutter-primary"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={toggleMenu}
          >
            Início
          </Link>
          <Link 
            to="/dashboard" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/login" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
