
export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "A rich and creamy North Indian curry made with paneer (Indian cottage cheese) in a tomato-based sauce.",
    cookTime: "30",
    servings: "4",
    ingredients: [
      "250g paneer",
      "2 onions",
      "3 tomatoes",
      "2 tbsp butter",
      "1 tsp ginger paste",
      "1 tsp garlic paste",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric",
      "1/2 cup cream",
      "Salt to taste",
      "Fresh coriander",
    ],
    instructions: [
      "Cut paneer into cubes and soak in warm water.",
      "Heat butter in a pan. Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 1-2 minutes.",
      "Add chopped tomatoes and cook until soft and oil separates.",
      "Add turmeric, red chili powder, and salt. Mix well.",
      "Blend the mixture into a smooth paste and return to the pan.",
      "Add water to adjust consistency and bring to a boil.",
      "Add paneer cubes and simmer for 5 minutes.",
      "Add cream and garam masala. Mix well and cook for 2 minutes.",
      "Garnish with fresh coriander and serve hot with naan or rice."
    ]
  },
  {
    id: "2",
    title: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "A popular South Indian breakfast consisting of a thin crispy crepe filled with spiced potato filling.",
    cookTime: "45",
    servings: "4",
    ingredients: [
      "2 cups rice",
      "1 cup urad dal",
      "1/4 tsp fenugreek seeds",
      "Salt to taste",
      "Oil for cooking",
      "4 potatoes",
      "2 onions",
      "1 tsp mustard seeds",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "2 green chilies",
      "Curry leaves",
      "Fresh coriander"
    ],
    instructions: [
      "Soak rice, urad dal, and fenugreek seeds separately for 4-6 hours.",
      "Grind them into a smooth batter. Add salt and ferment overnight.",
      "For the filling, boil potatoes and mash them.",
      "Heat oil in a pan. Add mustard seeds and cumin seeds.",
      "Add chopped onions and green chilies. Sauté until onions are translucent.",
      "Add turmeric powder, curry leaves, and salt. Mix well.",
      "Add mashed potatoes and mix thoroughly. Cook for 5 minutes.",
      "Heat a dosa tawa and spread a ladleful of batter in a circular motion.",
      "Drizzle oil around the edges and cook until golden brown.",
      "Place a portion of the potato filling on one side of the dosa and fold.",
      "Serve hot with coconut chutney and sambar."
    ]
  },
  {
    id: "3",
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1601565960311-8a7f4e1ab709?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "A popular North Indian dish made with spinach and paneer (Indian cottage cheese) cooked with spices.",
    cookTime: "35",
    servings: "4",
    ingredients: [
      "250g paneer",
      "500g spinach",
      "2 onions",
      "2 tomatoes",
      "2 green chilies",
      "1 tsp cumin seeds",
      "1 tsp ginger paste",
      "1 tsp garlic paste",
      "1/2 tsp garam masala",
      "1/2 tsp turmeric",
      "1/4 cup cream",
      "Salt to taste",
      "2 tbsp oil"
    ],
    instructions: [
      "Blanch spinach in boiling water for 2-3 minutes. Drain and cool.",
      "Blend the spinach into a smooth puree.",
      "Cut paneer into cubes and lightly fry until golden. Set aside.",
      "Heat oil in a pan. Add cumin seeds and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 1-2 minutes.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric, green chilies, and salt. Mix well.",
      "Add the spinach puree and cook for 5 minutes.",
      "Add paneer cubes and simmer for 5 more minutes.",
      "Add cream and garam masala. Mix well.",
      "Serve hot with roti or rice."
    ]
  },
  {
    id: "4",
    title: "Chole Bhature",
    image: "https://images.unsplash.com/photo-1626500155304-facd191804dc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "A popular North Indian dish consisting of spicy chickpeas (chole) served with fried bread (bhature).",
    cookTime: "60",
    servings: "4",
    ingredients: [
      "2 cups chickpeas (soaked overnight)",
      "2 onions",
      "2 tomatoes",
      "2 tbsp oil",
      "1 tsp cumin seeds",
      "2 bay leaves",
      "1 cinnamon stick",
      "2 cloves",
      "2 cardamom pods",
      "1 tsp ginger paste",
      "1 tsp garlic paste",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1/2 tsp turmeric powder",
      "1 tsp garam masala",
      "1/2 tsp amchur powder",
      "Salt to taste",
      "For bhature: 2 cups all-purpose flour",
      "1/2 tsp baking powder",
      "2 tbsp yogurt",
      "Water as needed",
      "Oil for deep frying"
    ],
    instructions: [
      "Pressure cook soaked chickpeas with salt until soft.",
      "Heat oil in a pan. Add cumin seeds, bay leaves, cinnamon, cloves, and cardamom.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 1-2 minutes.",
      "Add chopped tomatoes and cook until soft and oil separates.",
      "Add red chili powder, coriander powder, turmeric, and salt. Mix well.",
      "Add cooked chickpeas with some water. Mash a few chickpeas for thickness.",
      "Add garam masala and amchur powder. Simmer for 10 minutes.",
      "For bhature, mix flour, baking powder, yogurt, and salt. Knead into a soft dough.",
      "Cover and let it rest for 2-3 hours.",
      "Divide the dough into small balls and roll into oval shapes.",
      "Deep fry each bhatura until puffed and golden brown.",
      "Serve hot chole with bhature."
    ]
  }
];

// Function to filter recipes based on available ingredients
export const findRecipesByIngredients = (ingredients: string[]) => {
  const lowercaseIngredients = ingredients.map(ing => ing.toLowerCase());
  
  return mockRecipes.map(recipe => {
    // Check which ingredients match
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    
    const matchedIngredients = recipeIngredients.filter(ing => {
      return lowercaseIngredients.some(userIng => ing.includes(userIng));
    });
    
    // Calculate missing ingredients
    const missingIngredients = recipeIngredients.filter(ing => {
      return !lowercaseIngredients.some(userIng => ing.includes(userIng));
    });
    
    // Calculate match percentage
    const matchPercentage = (matchedIngredients.length / recipeIngredients.length) * 100;
    
    return {
      ...recipe,
      matchedIngredients: matchedIngredients.map(ing => {
        // Find the original casing from recipe.ingredients
        const originalIng = recipe.ingredients.find(original => 
          original.toLowerCase() === ing || original.toLowerCase().includes(ing)
        );
        return originalIng || ing;
      }),
      missingIngredients: missingIngredients.map(ing => {
        // Find the original casing from recipe.ingredients
        const originalIng = recipe.ingredients.find(original => 
          original.toLowerCase() === ing || original.toLowerCase().includes(ing)
        );
        return originalIng || ing;
      }),
      matchPercentage
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
};
