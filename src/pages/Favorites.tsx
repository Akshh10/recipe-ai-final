
import React, { useState } from "react";
import { useLikedRecipes } from "@/components/LikedRecipesContext";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import { Recipe, mockRecipes } from "@/utils/mockData";

const Favorites = () => {
  const { likedRecipes } = useLikedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [matchedIngredients, setMatchedIngredients] = useState<string[]>([]);
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
  
  const likedRecipesData = mockRecipes.filter(recipe => 
    likedRecipes.includes(recipe.id)
  );

  const handleRecipeClick = (recipe: Recipe, matched: string[], missing: string[]) => {
    setSelectedRecipe(recipe);
    setMatchedIngredients(matched);
    setMissingIngredients(missing);
  };

  return (
    <div className="min-h-screen flex flex-col pb-16">
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading text-3xl font-bold text-forest mb-4">Your Favorites</h1>
          
          {likedRecipesData.length === 0 ? (
            <div className="bg-cream/30 rounded-lg p-8 text-center">
              <p className="text-forest/70 mb-4">You haven't saved any favorite recipes yet.</p>
              <p className="text-forest/70">When you find recipes you love, tap the heart icon to save them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {likedRecipesData.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  matchedIngredients={recipe.matchedIngredients || []}
                  missingIngredients={recipe.missingIngredients || []}
                  cookTime={recipe.cookTime}
                  onClick={() => handleRecipeClick(
                    recipe, 
                    recipe.matchedIngredients || [], 
                    recipe.missingIngredients || []
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          id={selectedRecipe.id}
          title={selectedRecipe.title}
          image={selectedRecipe.image}
          description={selectedRecipe.description}
          cookTime={selectedRecipe.cookTime}
          servings={selectedRecipe.servings}
          matchedIngredients={matchedIngredients}
          missingIngredients={missingIngredients}
          instructions={selectedRecipe.instructions}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Favorites;
