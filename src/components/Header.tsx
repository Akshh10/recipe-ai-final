
import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-4 px-4">
      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>
    </header>
  );
};

export default Header;
