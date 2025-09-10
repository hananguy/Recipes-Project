export const registerSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 }
  },
  required: ["username", "email", "password", "firstName", "lastName"],
  additionalProperties: false
};