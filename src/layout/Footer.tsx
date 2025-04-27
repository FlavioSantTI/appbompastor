
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-card shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full flutter-gradient flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">Matrimony Flow</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Matrimony Flow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
