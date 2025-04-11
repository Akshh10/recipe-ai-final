
import React from "react";
import { Heart } from "lucide-react";
import { useLikedRecipes } from "./LikedRecipesContext";

interface LikeButtonProps {
  recipeId: string;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ recipeId, className = "" }) => {
  const { isLiked, toggleLike } = useLikedRecipes();
  const liked = isLiked(recipeId);
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleLike(recipeId);
      }}
      className={`rounded-full p-2 transition-all ${className}`}
      aria-label={liked ? "Unlike recipe" : "Like recipe"}
    >
      <Heart
        className={`h-6 w-6 transition-all ${
          liked ? "fill-terracotta text-terracotta" : "text-white stroke-[2.5]"
        }`}
      />
    </button>
  );
};

export default LikeButton;
