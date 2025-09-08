
import React from 'react';
import { NAV_LINKS } from '../constants';
import { ChevronDownIcon } from './icons/Icons';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-dark-card shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
          <ul className="flex space-x-4">
            {NAV_LINKS.map((link, index) => (
              <li key={link}>
                <a 
                  href="#"
                  className={`flex items-center text-sm font-medium whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 select-none
                    ${index === 0 
                      ? 'bg-primary-red text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                  }
                >
                  {link}
                  {['ASSETS', 'OTHER'].includes(link) && <ChevronDownIcon className="h-4 w-4 ml-1" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;