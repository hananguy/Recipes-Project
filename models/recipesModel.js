const recipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta with creamy sauce and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 eggs",
      "50g parmesan",
      "Salt",
      "Pepper"
    ],
    instructions: [
      "Boil pasta until al dente.",
      "Fry pancetta until crispy.",
      "Mix eggs and parmesan in a bowl.",
      "Combine pasta, pancetta, and egg mixture.",
      "Season with salt and pepper, serve hot."
    ],
    cookingTime: 25,
    servings: 2,
    difficulty: "medium",
    rating: 4.7,
    createdAt: "2025-01-15T12:00:00.000Z"
  },
  {
    id: "2",
    title: "Chicken Curry",
    description: "Spicy and flavorful chicken curry with coconut milk.",
    ingredients: [
      "500g chicken breast",
      "2 onions",
      "3 garlic cloves",
      "1 tbsp curry powder",
      "400ml coconut milk",
      "Salt",
      "Coriander"
    ],
    instructions: [
      "Chop chicken and vegetables.",
      "Fry onions and garlic until golden.",
      "Add curry powder and cook for 1 minute.",
      "Add chicken and cook until browned.",
      "Pour in coconut milk and simmer for 20 minutes.",
      "Garnish with coriander and serve."
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: "hard",
    rating: 4.8,
    createdAt: "2025-02-01T09:30:00.000Z"
  },
  {
    id: "3",
    title: "Avocado Toast",
    description: "Simple and healthy breakfast option with smashed avocado.",
    ingredients: [
      "2 slices of bread",
      "1 ripe avocado",
      "Salt",
      "Pepper",
      "Chili flakes",
      "Olive oil"
    ],
    instructions: [
      "Toast the bread slices.",
      "Mash avocado with salt, pepper, and olive oil.",
      "Spread avocado mixture on toast.",
      "Sprinkle chili flakes on top.",
      "Serve immediately."
    ],
    cookingTime: 10,
    servings: 1,
    difficulty: "easy",
    rating: 4.3,
    createdAt: "2025-02-10T08:00:00.000Z"
  }
];

export const GetRecipes = function()
{
    return recipes;
}

export const GetRecipesById = function(id)
{
    const requiredRecipe = recipes.find(recipe => recipe.id === id);
    return requiredRecipe;
}

export const AddRecipe = function(newRecipe)
{
    newRecipe["id"] = recipes.length + 1;
    newRecipe["createdAt"] = new Date().toISOString();
    recipes.push(newRecipe);
    return newRecipe;
}

export const UpdateRecipe = function(id, newData)
{
    const requiredRecipe = recipes.find(recipe => recipe.id === Number(id));
    requiredRecipe = newData;
    return requiredRecipe;
}

export const DeleteRecipe = function(id)
{
    const index = recipes.findIndex(recipe => recipe.id === id);
    
    if(index !== -1)
    { 
        recipes.splice(index, 1);
        return true;
    }
    else
    {
        return false;
    }

}

export default {GetRecipes, GetRecipesById, AddRecipe, UpdateRecipe, DeleteRecipe};