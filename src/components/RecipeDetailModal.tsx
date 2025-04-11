
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Clock, ChefHat, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface RecipeDetailProps {
  id: string;
  title: string;
  image: string;
  description: string;
  cookTime: string;
  servings: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  instructions: string[];
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailProps> = ({
  title,
  image,
  description,
  cookTime,
  servings,
  matchedIngredients,
  missingIngredients,
  instructions,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white p-4 md:p-6 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-heading text-forest">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div>
          <div className="relative w-full aspect-[16/9]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-terracotta" />
                <span>{cookTime} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-terracotta" />
                <span>{servings} servings</span>
              </div>
            </div>

            <p className="text-forest/80">{description}</p>

            <Separator />

            <div>
              <h3 className="font-heading text-xl mb-4">Ingredients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Ingredients You Have</span>
                  </h4>
                  <ul className="space-y-1">
                    {matchedIngredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-terracotta"></span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {missingIngredients.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Additional Ingredients Needed</h4>
                    <ul className="space-y-1">
                      {missingIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-forest/70">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-heading text-xl mb-4">Instructions</h3>
              <ol className="space-y-4">
                {instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-terracotta text-white text-sm">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
