import Ajv from "ajv";
import addFormats from "ajv-formats";
import { recipeSchema } from "../data/recipe.schema.js"
const ajv = new Ajv();

addFormats(ajv);
const validateRecipe = ajv.compile(recipeSchema);

function recipeValidation(req, res, next) {
  const valid = validateRecipe(req.body);

  if (valid) {
    next();
  } else {
    const error = new Error("Recipe validation error")
    error.status = 400;
    error.message = validateRecipe.errors[0].message;
    next(error);
  }
}

export default recipeValidation;