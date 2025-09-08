
import React from 'react';
import { SearchIcon, BellIcon, CogIcon, UserCircleIcon, LogoutIcon, SunIcon, MoonIcon } from './icons/Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-dark-card shadow-md px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-8 h-8 bg-blue-500 rounded-md mr-2"></span>
            <span className="font-bold text-xl text-gray-800 dark:text-white select-none">Wealth Elite</span>
          </div>
          <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 select-none">Live portfolio</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-100 dark:bg-gray-700 rounded-full py-1.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-red w-72"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none select-none">
            {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
            <CogIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
            <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
            <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 select-none">
              <LogoutIcon className="h-5 w-5" />
              <span className="hidden lg:inline">LOGOUT</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;