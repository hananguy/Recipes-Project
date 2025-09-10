import Ajv from "ajv";
import addFormats from "ajv-formats";
import { registerSchema } from "../data/user.schema.js"
const ajv = new Ajv();

addFormats(ajv);
const validateRegister = ajv.compile(registerSchema);

function registerValidation(req, res, next) {
  const valid = validateRegister(req.body);

  if (valid) {
    next();
  } else {
    const error = new Error("Register validation error")
    error.status = 400;
    error.message = validateRegister.errors[0].message;
    next(error);
  }
}

export default registerValidation;