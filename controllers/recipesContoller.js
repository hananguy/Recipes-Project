import recipesModel from '../models/recipesModel.js';

export const GetRecipes = (req, res) => {
  try {
    const { difficulty, maxCookingTime, search } = req.query;
    let results = recipesModel.GetRecipes(); // always returns array

    // ✅ filter by difficulty
    if (typeof difficulty === "string") {
      const d = difficulty.toLowerCase().trim();
      const allowed = ["easy", "medium", "hard"];
      if (!allowed.includes(d)) {
        return res.status(400).json({ error: `difficulty must be one of ${allowed.join(", ")}` });
      }
      results = results.filter(r => r.difficulty === d);
    }

    if (maxCookingTime !== undefined) {
      const max = Number(maxCookingTime);
      if (!Number.isFinite(max) || max < 0) {
        return res.status(400).json({ error: "maxCookingTime must be a non-negative number" });
      }
      results = results.filter(r => r.cookingTime <= max);
    }

    if (typeof search === "string" && search.trim() !== "") {
      const term = search.toLowerCase().trim();
      results = results.filter(r =>
        `${r.title} ${r.description}`.toLowerCase().includes(term)
      );
    }

    return res.status(200).json({
      count: results.length,
      items: results
    });
  } catch (err) {
    console.error("Error in GetRecipes:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetRecipesById = (req, res) =>
{
    const id = req.params.id;
    const requiredRecipe = recipesModel.GetRecipesById(id);

    if(requiredRecipe === undefined)
    {
        res.status(400).json({ error: "Id not found" })
    }
    else
    {
        res.status(200).json(requiredRecipe);

    }
}

export const PostRecipe = (req, res) =>
{
    const newRecipe = recipesModel.AddRecipe(req.body);
    res.json(newRecipe);
}

export const DeleteRecipe = (req, res) =>
{
    const id = req.params.id;
    const removed = recipesModel.DeleteRecipe(id);

    if(removed)
    {
        return res.status(202).json("Recipe deleted.");
    }
    else
    {
        return res.status(404).end("Recipe not found.");
    }
}

export const UpdateRecipe = (req, res) =>
{
    const id = req.params.id;
    const updatedRecipe = recipesModel.UpdateRecipe(id, req.body);

    if(updatedRecipe === undefined)
    {
        return res.status(404).json("Recipe not found");
    }
    else
    {
        return res.status(200).json(updatedRecipe);
    }
}