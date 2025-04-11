
import { Heart } from "lucide-react";
import { useLikedRecipes } from "./LikedRecipesContext";

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
  id,
  title,
  image,
  matchedIngredients,
  missingIngredients,
  cookTime,
  onClick,
}: RecipeProps) => {
  const { isLiked, toggleLike } = useLikedRecipes();
  const liked = isLiked(id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(id);
  };

  return (
    <div 
      className="recipe-card cursor-pointer group" 
      onClick={onClick}
    >
      <div className="flex bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="w-1/3 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-2/3 p-3 relative">
          <button
            onClick={handleLikeClick}
            className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full transition-colors hover:bg-white"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? "fill-terracotta text-terracotta" : "text-forest"
              }`}
            />
          </button>
          
          <h3 className="font-heading font-medium text-base mb-1 pr-6 line-clamp-1">{title}</h3>
          <p className="text-xs text-forest/70 mb-2">{cookTime} mins</p>
          
          <div className="flex flex-wrap gap-1 mb-1">
            {matchedIngredients.slice(0, 2).map((ingredient, index) => (
              <span key={index} className="ingredient-tag text-xs py-0.5 px-2">
                {ingredient.split(' ')[0]}
              </span>
            ))}
            {matchedIngredients.length > 2 && (
              <span className="ingredient-tag text-xs py-0.5 px-2">
                +{matchedIngredients.length - 2}
              </span>
            )}
          </div>
          
          {missingIngredients.length > 0 && (
            <p className="text-xs text-forest/70 mt-1 line-clamp-1">
              Missing: {missingIngredients.slice(0, 1).join(", ")}
              {missingIngredients.length > 1 && ` +${missingIngredients.length - 1}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
