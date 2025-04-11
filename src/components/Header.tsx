
import { ChefHat, Heart, Home, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useLikedRecipes } from "./LikedRecipesContext";

const Header = () => {
  const { likedRecipes } = useLikedRecipes();
  
  return (
    <header className="flex items-center justify-between py-5 px-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <ChefHat className="h-7 w-7 text-terracotta" />
        <span className="text-xl font-heading font-bold text-forest">Recipe AI</span>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
        <ul className="flex justify-around py-3">
          <li>
            <Link to="/" className="flex flex-col items-center text-xs">
              <Home className="h-6 w-6 mb-1 text-forest" />
              <span>Home</span>
            </Link>
          </li>
          <li className="relative">
            <Link to="#recipes" className="flex flex-col items-center text-xs">
              <Heart className="h-6 w-6 mb-1 text-forest" />
              <span>Favorites</span>
            </Link>
            {likedRecipes.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likedRecipes.length}
              </span>
            )}
          </li>
          <li>
            <Link to="#about" className="flex flex-col items-center text-xs">
              <Info className="h-6 w-6 mb-1 text-forest" />
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <button className="bg-terracotta text-white py-2 px-3 text-sm rounded-lg hover:bg-opacity-90 transition-colors">
        Join Waitlist
      </button>
    </header>
  );
};

export default Header;
