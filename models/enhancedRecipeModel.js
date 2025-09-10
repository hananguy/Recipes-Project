import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../db/models/index.js";
import cloudinaryModule from 'cloudinary';
const cloudinary = cloudinaryModule.v2;


export const AddRecipe = async (Recipe, ImagePath, userID) => {
  const uuId = uuidv4();

 const query = `
  INSERT INTO recipes (
    id, title, description, ingredients, instructions,
    cookingTime, servings, difficulty, imageUrl, isPublic,
    userId, createdAt, updatedAt
  )
  VALUES (
    :id, :title, :description, CAST(:ingredients AS JSON), CAST(:instructions AS JSON),
    :cookingTime, :servings, :difficulty, :imageUrl, COALESCE(:isPublic, TRUE),
    :userId, NOW(), NOW()
  );
`;
    const uploadResult = await cloudinary.uploader.upload(ImagePath);//Upload the photo to cloudinary
    // console.log(uploadResult.url);
  const [rows] = await sequelize.query(query, {
    replacements: {
      id: uuId,
      title: Recipe.title ?? null,
      description: Recipe.description ?? null,
      ingredients: JSON.stringify(Recipe.ingredients ?? []),
      instructions: JSON.stringify(Recipe.instructions ?? []),
      cookingTime: Recipe.cookingTime ?? null,
      servings: Recipe.servings ?? null,
      difficulty: Recipe.difficulty ?? null,
      imageUrl: uploadResult.url ?? null,
      isPublic: Recipe.isPublic ?? true,
      userId: userID,
    },
  });

  return(await  GetRecipesById(uuId));
};

async function GetRecipesById(id) {
  const query = `
  SELECT *
  FROM recipes
  WHERE id=:id
  `;
  const [results, metadata] = await sequelize.query(query, {
    replacements: { id },
  });
  return results[0];
}
