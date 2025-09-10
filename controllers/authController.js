import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {CreateUser, LoginUser} from "../models/authModel.js"

export const RegisterUser = async (req, res, next) =>
{
    try{
    const { username, email, password, firstName, lastName } = req.body;
    
    const user = await CreateUser({
    username,
    email,
    password,
    firstName,
    lastName,
  });

   const safeUser = {
    id: user.id,    
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const token = jwt.sign(
    safeUser,
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(201).json({
    success: true,
    status: 201,
    message: "User registered successfully",
    user: safeUser,
    token,
  });
    }
    catch(err){
        next({ status: 500, message: err.message });
    }
   

}

export const Login = async (req, res, next) =>
{
     try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      next({ status: 400, message: "email or password missing" });
    }
    const safeUser = await LoginUser(email, password);
    if (!safeUser) {
      next({ status: 401, message: "invalid email or password" });
    }

    const token = jwt.sign(safeUser, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.status(201).json({
    success: true,
    status: 201,
    message: "User loged in.",
    user: safeUser,
    token,
  });
  } catch (err) {
    next({ status: 401, message: err });
  }
}

export const GetProfile = (req, res, next) =>
{
    res.status(200).send(req.user);
}

