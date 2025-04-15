
import React from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <ChefHat className="h-6 w-6 text-terracotta mr-2" />
          <h1 className="text-xl font-heading font-bold text-forest">Recipe AI</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
