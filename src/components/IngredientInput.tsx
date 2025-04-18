
import React, { useState, KeyboardEvent, useEffect, useRef, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

// Common ingredients list for autocomplete suggestions
const commonIngredients = [
  "Tomato", "Onion", "Garlic", "Ginger", "Potato",
  "Rice", "Wheat flour", "Paneer", "Chicken", "Mutton",
  "Fish", "Eggs", "Milk", "Yogurt", "Cheese",
  "Butter", "Ghee", "Oil", "Salt", "Sugar",
  "Black pepper", "Red chilli", "Turmeric", "Cumin", "Coriander",
  "Garam masala", "Cardamom", "Cinnamon", "Cloves", "Mustard seeds",
  "Fenugreek", "Curry leaves", "Mint", "Cilantro", "Lemon",
  "Coconut", "Cashew nuts", "Almonds", "Raisins"
];

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useMemo to avoid unnecessary recalculations
  const updateSuggestions = useMemo(() => {
    return (input: string, currentIngrs: string[]): string[] => {
      if (!input || input.trim() === "") return [];
      
      // Filter ingredients not already added
      return commonIngredients
        .filter(ingredient => 
          ingredient.toLowerCase().includes(input.toLowerCase()) && 
          !currentIngrs.includes(ingredient)
        )
        .slice(0, 5);
    };
  }, []);

  useEffect(() => {
    // Create a safe copy of the ingredients array
    const currentIngredients = ingredients || [];
    
    // Update filtered suggestions based on input
    const filtered = updateSuggestions(inputValue, currentIngredients);
    setFilteredSuggestions(filtered);
    
    // Update popover state
    setIsOpen(filtered.length > 0 && inputValue.trim() !== "");
  }, [inputValue, ingredients, updateSuggestions]);

  const handleAddIngredient = (value: string = inputValue) => {
    const ingredient = value.trim();
    if (ingredient === "") return;
    
    // Safety check for duplicates
    if (ingredients && !ingredients.includes(ingredient)) {
      const newIngredients = [...(ingredients || []), ingredient];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
    
    setInputValue("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    } else if (e.key === "Backspace" && inputValue === "" && ingredients && ingredients.length > 0) {
      const newIngredients = ingredients.slice(0, -1);
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
  };

  const removeIngredient = (index: number) => {
    if (!ingredients || index < 0 || index >= ingredients.length) return;
    
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  // Ensure we have valid arrays
  const validSuggestions = Array.isArray(filteredSuggestions) ? filteredSuggestions : [];
  const validIngredients = Array.isArray(ingredients) ? ingredients : [];
  const showSuggestions = isOpen && validSuggestions.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Popover open={showSuggestions} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter ingredients you have (e.g., paneer, tomato, garam masala)"
              className="flex-grow focus-visible:ring-terracotta"
            />
            <Button 
              onClick={() => handleAddIngredient()} 
              className="bg-terracotta hover:bg-terracotta/90 text-white"
            >
              <Plus className="h-5 w-5" />
              <span className="ml-1 hidden sm:inline">Add</span>
            </Button>
          </div>
        </PopoverTrigger>
        
        {showSuggestions && validSuggestions.length > 0 && (
          <PopoverContent className="p-0 w-[calc(100%-5rem)] shadow-md" align="start" sideOffset={5}>
            <Command>
              {validSuggestions.length > 0 && (
                <CommandGroup>
                  {validSuggestions.map((suggestion, index) => {
                    // Additional safety check
                    if (!suggestion) return null;
                    return (
                      <CommandItem
                        key={`suggestion-${index}-${suggestion}`}
                        value={suggestion}
                        onSelect={() => {
                          handleAddIngredient(suggestion);
                          setInputValue("");
                        }}
                        className="cursor-pointer hover:bg-cream/50"
                      >
                        {suggestion}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </Command>
          </PopoverContent>
        )}
      </Popover>

      <AnimatePresence>
        {validIngredients.length > 0 && (
          <motion.div 
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {validIngredients.map((ingredient, index) => {
              // Safety check
              if (!ingredient) return null;
              return (
                <motion.div
                  key={`ingredient-${index}-${ingredient}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="ingredient-tag flex items-center gap-1 bg-cream px-3 py-1 rounded-full text-forest"
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
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IngredientInput;
