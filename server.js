import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan"
import recipesRouter from "./routes/recipesRouter.js";

const app = express();
app.use(express.json());
morgan.token("time", () => new Date().toISOString());
app.use(morgan(":method :url :status :response-time ms - :time"));


app.use('/api/recipes', recipesRouter)




app.listen(8080, () =>
{
    console.log("Server is running on port 8080");
})


// Error Handling Middleware (always in the END)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
})