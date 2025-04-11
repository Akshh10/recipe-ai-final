
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <ChefHat className="h-8 w-8 text-terracotta" />
        <span className="text-2xl font-heading font-bold text-forest">Recipe AI</span>
      </div>
      
      <nav className="hidden md:block">
        <ul className="flex gap-6">
          <li><a href="#" className="hover:text-terracotta transition-colors">Home</a></li>
          <li><a href="#recipes" className="hover:text-terracotta transition-colors">Recipes</a></li>
          <li><a href="#about" className="hover:text-terracotta transition-colors">About</a></li>
        </ul>
      </nav>
      
      <button className="bg-terracotta text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
        Join Waitlist
      </button>
    </header>
  );
};

export default Header;
