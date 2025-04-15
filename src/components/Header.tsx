
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-4 px-4 shadow-sm">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="text-forest font-heading font-bold text-lg">Recipe AI</div>
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center bg-gray-50 rounded-full px-4 py-2 w-44">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-cream rounded-full p-2 flex items-center justify-center"
          >
            <User className="h-5 w-5 text-forest" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
