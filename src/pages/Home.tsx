import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import { findRecipesByIngredients, Recipe } from "@/utils/mockData";
import { Sparkles, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
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
    toast({
      title: "Finding recipes",
      description: "Creating your perfect dish with your ingredients...",
      className: "bg-terracotta text-white",
    });
    
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
      } else {
        toast({
          title: "Recipes found!",
          description: `Found ${results.length} recipes matching your ingredients.`,
          className: "bg-forest text-white",
        });
      }
    }, 1500);
  };

  const handleRecipeClick = (recipe: Recipe, matched: string[], missing: string[]) => {
    setSelectedRecipe(recipe);
    setMatchedIngredients(matched);
    setMissingIngredients(missing);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="px-6 py-10 bg-gradient-to-br from-cream/30 via-soft-purple/20 to-soft-yellow/30 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg mx-auto space-y-4 text-center">
          <motion.div 
            className="space-y-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold font-heading text-forest">
              {getGreeting()}
            </h2>
            <p className="text-xl font-medium text-forest/90">
              What would you like to cook today?
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Manual Input Section */}
      <motion.section 
        className="px-4 py-6 bg-white rounded-t-xl mx-2 shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-terracotta" />
            <h2 className="text-xl font-heading font-semibold">Find recipes</h2>
          </div>
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-sm text-terracotta flex items-center gap-1"
            onClick={() => toast({
              title: "AI Suggestion",
              description: "Try adding 'chicken' and 'pasta' for quick dinner ideas!",
            })}
          >
            <Sparkles className="h-3 w-3" />
            <span>Suggestions</span>
          </Button>
        </div>
        <IngredientInput onIngredientsChange={setIngredients} />
        <Button 
          onClick={handleSearch}
          className="w-full mt-4 bg-terracotta hover:bg-terracotta/90 text-white font-medium shadow-sm hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Recipes'}
        </Button>
      </motion.section>

      {/* Recipes Section */}
      <motion.section 
        className="px-4 py-6 bg-white mx-2 rounded-b-xl shadow-sm mb-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-6" variants={item}>
          <h2 className="text-2xl font-semibold font-heading mb-1 text-forest">
            {hasSearched ? 'Found Recipes' : 'Popular Recipes'}
          </h2>
          <p className="text-sm text-forest/70">
            {hasSearched ? 
              'Recipes that match your ingredients' : 
              'Trending recipes that our community loves'
            }
          </p>
        </motion.div>
        
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
      </motion.section>

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
    </motion.div>
  );
};

export default Home;
