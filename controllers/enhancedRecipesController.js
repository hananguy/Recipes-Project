import { AddRecipe } from "../models/enhancedRecipeModel.js";

export const UploadResource = async (req, res) =>
{
    console.log('dest:', req.file.destination); // התיקייה
    const recipe = typeof req.body.data === 'string'
      ? JSON.parse(req.body.data)
      : req.body.data;
    const newRecipe = await AddRecipe(recipe, req.file.path, req.user.id);
    res.status(201).json(newRecipe);
}