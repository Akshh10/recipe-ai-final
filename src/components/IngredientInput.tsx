
import React, { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  const handleAddIngredient = () => {
    const ingredient = inputValue.trim();
    if (ingredient === "") return;
    
    const currentIngredients = Array.isArray(ingredients) ? ingredients : [];
    
    if (!currentIngredients.includes(ingredient)) {
      const newIngredients = [...currentIngredients, ingredient];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
    
    setInputValue("");
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    } else if (e.key === "Backspace" && inputValue === "" && ingredients.length > 0) {
      const newIngredients = ingredients.slice(0, -1);
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
  };
  
  const removeIngredient = (index: number) => {
    if (!Array.isArray(ingredients) || index < 0 || index >= ingredients.length) {
      return;
    }
    
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter ingredients you have (e.g., paneer, tomato)"
          className="flex-grow focus-visible:ring-terracotta"
        />
        <Button 
          onClick={handleAddIngredient} 
          className="bg-terracotta hover:bg-terracotta/90 text-white"
        >
          <Plus className="h-5 w-5" />
          <span className="ml-1 hidden sm:inline">Add</span>
        </Button>
      </div>

      <AnimatePresence>
        {ingredients.length > 0 && (
          <motion.div 
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={`ingredient-${index}-${ingredient}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 bg-cream px-3 py-1 rounded-full text-forest"
                layout
              >
                <span>{ingredient}</span>
                <button
                  onClick={() => removeIngredient(index)}
                  className="text-forest hover:text-terracotta transition-colors ml-1"
                  aria-label={`Remove ${ingredient}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IngredientInput;
