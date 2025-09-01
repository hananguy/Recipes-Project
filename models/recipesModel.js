import fs from "fs";
import path from "path";

export const GetRecipes = function () {
  const filePath = path.resolve("data", "recipes.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const recipes = JSON.parse(data);
  return recipes;
};

export const GetRecipesById = function(id)
{
    const filePath = path.resolve("data", "recipes.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(data);
    const requiredRecipe = recipes.find(recipe => recipe.id === id);
    return requiredRecipe;
}

export const AddRecipe = function(newRecipe)
{
    const filePath = path.resolve("data", "recipes.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(data);
    newRecipe["id"] = recipes.length + 1;
    newRecipe["createdAt"] = new Date().toISOString();
    console.log(newRecipe);
    recipes.push(newRecipe);
    return newRecipe;
}

export const UpdateRecipe = function(id, newData)
{
    const filePath = path.resolve("data", "recipes.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(data);
    const index = recipes.findIndex(recipe => recipe.id === id);

    if (index === -1) {
        return null; 
    }

    recipes[index] = { 
        ...recipes[index], 
        ...newData 
    };

    return recipes[index];
}

export const DeleteRecipe = function(id)
{
    const filePath = path.resolve("data", "recipes.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(data);
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