import express from "express";
const router = express.Router();
import { GetRecipes, GetRecipesById, PostRecipe, DeleteRecipe} from "../controllers/recipesContoller.js";

router.get('/', GetRecipes);
router.get('/:id', GetRecipesById);
router.post('/', PostRecipe);
router.delete('/:id', DeleteRecipe);

export default router;