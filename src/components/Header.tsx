
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-4 px-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex-1"></div>
        <div className="relative flex items-center bg-gray-50 rounded-full px-3 py-1.5 w-40 border border-gray-100">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => navigate('/profile')}
            className="bg-cream rounded-full p-2 flex items-center justify-center shadow-sm hover:bg-cream/80 transition-colors"
          >
            <User className="h-5 w-5 text-forest" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
