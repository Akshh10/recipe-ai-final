
import React, { createContext, useState, useContext, useEffect } from "react";

interface LikedRecipesContextType {
  likedRecipes: string[];
  toggleLike: (recipeId: string) => void;
  isLiked: (recipeId: string) => boolean;
}

const LikedRecipesContext = createContext<LikedRecipesContextType>({
  likedRecipes: [],
  toggleLike: () => {},
  isLiked: () => false,
});

export const useLikedRecipes = () => useContext(LikedRecipesContext);

export const LikedRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [likedRecipes, setLikedRecipes] = useState<string[]>(() => {
    const savedLikes = localStorage.getItem("likedRecipes");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  const toggleLike = (recipeId: string) => {
    setLikedRecipes(current => 
      current.includes(recipeId)
        ? current.filter(id => id !== recipeId)
        : [...current, recipeId]
    );
  };

  const isLiked = (recipeId: string) => {
    return likedRecipes.includes(recipeId);
  };

  return (
    <LikedRecipesContext.Provider value={{ likedRecipes, toggleLike, isLiked }}>
      {children}
    </LikedRecipesContext.Provider>
  );
};
