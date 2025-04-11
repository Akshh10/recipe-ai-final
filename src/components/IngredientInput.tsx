
import React, { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddIngredient = () => {
    if (inputValue.trim() !== "" && !ingredients.includes(inputValue.trim())) {
      const newIngredients = [...ingredients, inputValue.trim()];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setInputValue("");
    }
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
          placeholder="Enter ingredients you have (e.g., paneer, tomato, garam masala)"
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

      {ingredients.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 animate-fade-in">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="ingredient-tag flex items-center gap-1"
            >
              <span>{ingredient}</span>
              <button
                onClick={() => removeIngredient(index)}
                className="text-forest hover:text-terracotta transition-colors"
                aria-label={`Remove ${ingredient}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
