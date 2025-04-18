
import React from "react";
import { ArrowLeft, Search, FilterX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/RecipeCard";
import { findRecipesByIngredients } from "@/utils/mockData";

const SavedRecipes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  
  // In a real app, this would come from a context or API
  const savedRecipes = findRecipesByIngredients(['chicken', 'rice']).slice(0, 5);
  
  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <header className="bg-white p-4 sticky top-0 z-10 flex items-center shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/profile")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold font-heading">Saved Recipes</h1>
      </header>
      
      <main className="flex-1 p-4">
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest/50" />
          <Input 
            placeholder="Search your saved recipes" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full"
              onClick={() => setSearchTerm("")}
            >
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="max-w-md mx-auto">
          {filteredRecipes.length > 0 ? (
            <div className="grid gap-4">
              {filteredRecipes.map((recipe) => (
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
          ) : (
            <div className="text-center py-8">
              <p className="text-forest/70">No saved recipes found{searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/')}
              >
                Discover Recipes
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedRecipes;
