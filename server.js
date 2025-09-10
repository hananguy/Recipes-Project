import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan"
import recipesRouter from "./routes/recipesRouter.js";
import authRouter from "./routes/authRouter.js"
import {sequelize} from './db/models/index.js';
import enhancedRecipesRouter from "./routes/enhancedRecipesRoute.js"

const app = express();
app.use(express.json());
morgan.token("time", () => new Date().toISOString());
app.use(morgan(":method :url :status :response-time ms - :time"));


// app.use('/api/recipes', recipesRouter)
app.use('/api/auth', authRouter);
app.use('/api/recipes', enhancedRecipesRouter);


app.listen(8080, async () =>
{
  console.log(`🚀 Server running on port 8080`);
  await testConnection();
})


// Error Handling Middleware (always in the END)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
})

async function testConnection() {
 try {
   await sequelize.authenticate();
   console.log('✅ Database connection established successfully.');
 } catch (error) {
   console.error('❌ Unable to connect to database:', error);
 }
}
