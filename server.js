import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import recipesRouter from "./routes/recipesRouter.js";

const app = express();
app.use(express.json());


app.use('/api/recipes', recipesRouter)




app.listen(8080, () =>
{
    console.log("Server is running on port 8080");
})