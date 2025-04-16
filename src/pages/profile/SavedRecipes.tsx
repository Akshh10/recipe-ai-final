
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { findRecipesByIngredients } from "@/utils/mockData";

const SavedRecipes = () => {
  const navigate = useNavigate();
  // Using mock data for demonstration
  const savedRecipes = findRecipesByIngredients(['chicken']).slice(0, 4);
  
  return (
    <div className="min-h-screen bg-cream/10 pb-24">
      <div className="px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/profile')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <h1 className="font-heading text-3xl font-bold text-forest mb-6">Saved Recipes</h1>
        
        <div className="grid gap-4">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              matchedIngredients={recipe.matchedIngredients || []}
              missingIngredients={recipe.missingIngredients || []}
              cookTime={recipe.cookTime}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
