import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import { findRecipesByIngredients, Recipe } from "@/utils/mockData";

const Home = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<ReturnType<typeof findRecipesByIngredients>>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [matchedIngredients, setMatchedIngredients] = useState<string[]>([]);
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'manual'>('scan');
  
  const { toast } = useToast();

  const handleOpenCamera = () => {
    toast({
      title: "Camera Mode",
      description: "This is a mock implementation. In a real app, this would open the camera.",
    });
    
    // Mock data after "scanning"
    setTimeout(() => {
      setLoading(true);
      // Simulate API call with scanned ingredients
      setTimeout(() => {
        const scannedIngredients = ['tomato', 'onion', 'paneer', 'ginger'];
        setIngredients(scannedIngredients);
        
        const results = findRecipesByIngredients(scannedIngredients);
        setRecipes(results);
        setHasSearched(true);
        setLoading(false);
        
        toast({
          title: "Scan complete",
          description: `Found ${scannedIngredients.length} ingredients`,
        });
      }, 2000);
    }, 1000);
  };

  const handleSearch = () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to find recipes.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const results = findRecipesByIngredients(ingredients);
      setRecipes(results);
      setHasSearched(true);
      setLoading(false);
      
      if (results.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try adding different ingredients or fewer restrictions.",
        });
      }
    }, 1500);
  };

  const handleRecipeClick = (recipe: Recipe, matched: string[], missing: string[]) => {
    setSelectedRecipe(recipe);
    setMatchedIngredients(matched);
    setMissingIngredients(missing);
  };

  const scrollToRecipes = () => {
    document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src="/lovable-uploads/1d0f4556-4723-4ad6-9552-81509a5717ed.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent">
          <div className="p-6 text-white">
            <h2 className="text-2xl font-semibold">Good afternoon!</h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Find recipes</h2>
        <IngredientInput onIngredientsChange={setIngredients} />
        <Button 
          onClick={handleSearch}
          className="w-full mt-4 bg-[#0FA0CE] hover:bg-[#0FA0CE]/90"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Recipes'}
        </Button>
      </section>

      {/* Recipes Section */}
      <section className="px-4 py-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">
          {hasSearched ? 'Found Recipes' : 'Popular Recipes'}
        </h2>
        <div className="grid gap-4">
          {(hasSearched ? recipes : findRecipesByIngredients(['paneer', 'rice', 'potato']).slice(0, 4)).map((recipe) => (
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
      </section>

      {/* Modal */}
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

export default Home;
