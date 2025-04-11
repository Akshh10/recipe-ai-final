
import React from "react";
import { useLikedRecipes } from "./LikedRecipesContext";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/utils/mockData";

interface LikedRecipesSectionProps {
  allRecipes: Recipe[];
  onRecipeClick: (recipe: Recipe, matched: string[], missing: string[]) => void;
}

const LikedRecipesSection: React.FC<LikedRecipesSectionProps> = ({ 
  allRecipes, 
  onRecipeClick 
}) => {
  const { likedRecipes } = useLikedRecipes();
  
  const likedRecipesData = allRecipes.filter(recipe => 
    likedRecipes.includes(recipe.id)
  );

  if (likedRecipesData.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 py-8 bg-cream/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl text-forest mb-2">Your Favorite Recipes</h2>
        <p className="text-forest/70 mb-6">
          Recipes you've saved for later
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {likedRecipesData.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              matchedIngredients={recipe.matchedIngredients || []}
              missingIngredients={recipe.missingIngredients || []}
              cookTime={recipe.cookTime}
              onClick={() => onRecipeClick(
                recipe, 
                recipe.matchedIngredients || [], 
                recipe.missingIngredients || []
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LikedRecipesSection;
