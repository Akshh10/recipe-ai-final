
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-4 px-4 mb-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex-1" />
        <div className="relative flex items-center bg-gray-50 rounded-full px-3 py-1.5 w-72 border border-gray-100 mx-4">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => navigate('/profile')}
            className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
