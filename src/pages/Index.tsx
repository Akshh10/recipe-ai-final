
import { useState } from "react";
import { Search, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import WaitlistModal from "@/components/WaitlistModal";
import { findRecipesByIngredients, Recipe } from "@/utils/mockData";

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<ReturnType<typeof findRecipesByIngredients>>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [matchedIngredients, setMatchedIngredients] = useState<string[]>([]);
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const { toast } = useToast();

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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 md:px-6 py-12 md:py-24 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-forest mb-4 md:mb-6">
          Turn Ingredients into <span className="text-terracotta">Delicious Meals</span>
        </h1>
        <p className="text-lg md:text-xl text-forest/80 mb-8 md:mb-10 max-w-3xl">
          Experience the future of meal inspiration. Effortlessly transform your available ingredients 
          into authentic, delicious dishes with Recipe AI.
        </p>
        
        <div className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
          <IngredientInput onIngredientsChange={setIngredients} />
          
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={handleSearch}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg"
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
            <Button 
              variant="outline" 
              className="border-terracotta text-terracotta hover:bg-terracotta/5"
              onClick={() => setWaitlistModalOpen(true)}
            >
              Request Early Access
            </Button>
          </div>
        </div>

        {!hasSearched && (
          <button 
            onClick={scrollToRecipes} 
            className="flex items-center gap-2 text-forest/70 hover:text-terracotta transition-colors mt-8 animate-pulse"
          >
            <span>Browse Examples</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="bg-cream/30 px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-forest mb-2">{hasSearched ? 'Recipes for You' : 'Popular Recipes'}</h2>
          <p className="text-forest/70 mb-8">
            {hasSearched 
              ? `Found ${recipes.length} recipes based on your ingredients` 
              : 'Explore our collection of authentic dishes'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(hasSearched ? recipes : findRecipesByIngredients(['paneer', 'rice', 'potato'])).map((recipe) => (
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

      {/* About Section */}
      <section id="about" className="px-4 md:px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-forest mb-6">About Recipe AI</h2>
          <p className="text-forest/80 mb-6">
            Tired of cluttered recipe apps and the daily puzzle of "Aaj Kya Banayein?" (What to cook today?) 
            Recipe AI transforms your kitchen experience with a beautifully designed, 
            intelligent solution for turning available ingredients into delicious meals.
          </p>
          <p className="text-forest/80 mb-8">
            Our mission is to reduce food waste and inspire culinary creativity by connecting you 
            with authentic recipes based on what you already have.
          </p>
          <Button 
            onClick={() => setWaitlistModalOpen(true)}
            className="bg-terracotta hover:bg-terracotta/90 text-white"
          >
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white px-4 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Recipe AI. All rights reserved.</p>
      </footer>

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

export default Index;
