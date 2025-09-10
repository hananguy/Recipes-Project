import express from "express";
const router = express.Router();
import {RegisterUser, Login, GetProfile} from '../controllers/authController.js';
import validateRegister from "../middlewares/registerValidation.js";
import authenticate from "../middlewares/authentication.js";
router.post('/register', validateRegister, RegisterUser);
router.post('/login', Login);
router.get('/profile', authenticate, GetProfile);

export default router;