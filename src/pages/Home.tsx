
import React, { useState } from "react";
import { Camera, Search, Scan, Upload, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import WaitlistModal from "@/components/WaitlistModal";
import { findRecipesByIngredients, Recipe } from "@/utils/mockData";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

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
    <div className="min-h-screen flex flex-col pb-16 pt-0">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 pt-4 pb-12 max-w-md mx-auto">
        <h1 className="text-3xl font-heading font-bold text-forest mb-4">
          Turn Ingredients into <span className="text-terracotta">Meals</span>
        </h1>
        
        <div className="w-full mx-auto mb-6">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="w-full border-b border-gray-200 flex justify-center">
              <div className="w-1/2 text-center">
                <NavigationMenuLink 
                  className={`block px-4 py-3 ${activeTab === 'scan' ? 'text-terracotta border-b-2 border-terracotta' : 'text-forest/70'}`}
                  onClick={() => setActiveTab('scan')}
                >
                  Scan
                </NavigationMenuLink>
              </div>
              <div className="w-1/2 text-center">
                <NavigationMenuLink 
                  className={`block px-4 py-3 ${activeTab === 'manual' ? 'text-terracotta border-b-2 border-terracotta' : 'text-forest/70'}`}
                  onClick={() => setActiveTab('manual')}
                >
                  Manual
                </NavigationMenuLink>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="mt-8">
            {activeTab === 'scan' ? (
              <div className="flex flex-col items-center">
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-6">
                  <Camera className="h-16 w-16 text-gray-300" />
                </div>
                <Button 
                  onClick={handleOpenCamera}
                  className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg w-full"
                >
                  <Scan className="mr-2 h-5 w-5" />
                  Scan Ingredients
                </Button>
                <Button 
                  variant="outline" 
                  className="mt-3 border-gray-300 text-forest/70 py-5 w-full"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Photo
                </Button>
              </div>
            ) : (
              <div>
                <IngredientInput onIngredientsChange={setIngredients} />
                <Button 
                  onClick={handleSearch}
                  className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg w-full mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Finding recipes...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      <span>Find Recipes</span>
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {!hasSearched && (
          <button 
            onClick={scrollToRecipes} 
            className="flex items-center gap-2 text-forest/70 hover:text-terracotta transition-colors mt-4 animate-pulse"
          >
            <span>Popular Recipes</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="bg-cream/30 px-4 py-10">
        <div className="max-w-md mx-auto">
          <h2 className="font-heading text-2xl text-forest mb-2">{hasSearched ? 'Recipes for You' : 'Popular Recipes'}</h2>
          <p className="text-forest/70 mb-6">
            {hasSearched 
              ? `Found ${recipes.length} recipes based on your ingredients` 
              : 'Explore our collection of authentic dishes'}
          </p>

          <div className="grid grid-cols-1 gap-6">
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
        </div>
      </section>

      {/* Modals */}
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

      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
      />
    </div>
  );
};

export default Home;
