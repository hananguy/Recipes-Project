import express from "express";
const router = express.Router();
import { GetRecipes, GetRecipesById, PostRecipe, DeleteRecipe, UpdateRecipe} from "../controllers/recipesContoller.js";
import recipeValidation from "../middlewares/recipeValidation.js";

router.get('/', GetRecipes);
router.get('/:id', GetRecipesById);
router.post('/', recipeValidation, PostRecipe);
router.delete('/:id', DeleteRecipe);
router.put('/:id', recipeValidation, UpdateRecipe)
export default router;