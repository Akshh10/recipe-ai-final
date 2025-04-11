
import { Heart } from "lucide-react";
import { useState } from "react";

export interface RecipeProps {
  id: string;
  title: string;
  image: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  cookTime: string;
  onClick: () => void;
}

const RecipeCard = ({
  title,
  image,
  matchedIngredients,
  missingIngredients,
  cookTime,
  onClick,
}: RecipeProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="recipe-card cursor-pointer group" 
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full transition-colors hover:bg-white"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-terracotta text-terracotta" : "text-forest"
            }`}
          />
        </button>
      </div>
      <div className="p-4 bg-white rounded-b-xl border border-gray-100">
        <h3 className="font-heading font-medium text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-forest/70 mb-3">{cookTime} mins</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {matchedIngredients.slice(0, 3).map((ingredient, index) => (
            <span key={index} className="ingredient-tag text-xs py-0.5">
              {ingredient}
            </span>
          ))}
          {matchedIngredients.length > 3 && (
            <span className="ingredient-tag text-xs py-0.5">
              +{matchedIngredients.length - 3} more
            </span>
          )}
        </div>
        
        {missingIngredients.length > 0 && (
          <p className="text-xs text-forest/70 mt-1">
            Missing: {missingIngredients.slice(0, 2).join(", ")}
            {missingIngredients.length > 2 && ` +${missingIngredients.length - 2} more`}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
