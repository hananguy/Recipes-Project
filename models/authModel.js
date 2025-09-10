import { v4 as uuidv4 } from "uuid";
import {sequelize} from '../db/models/index.js';
import bcrypt from "bcrypt";

export async function CreateUser(user)
{

const passwordHash = await bcrypt.hash(user.password, 10);
const idUUID = uuidv4();
const query = `
 INSERT INTO users (id, username, email, password, firstName, lastName, createdAt, updatedAt)
 VALUES (:id, :username, :email, :password, :firstName, :lastName, NOW(), NOW())
`;

await sequelize.query(query, {
 replacements: {   id: idUUID,
      username: user.username,
      email: user.email,
      password: passwordHash, //Hashed
      firstName: user.firstName,
      lastName: user.lastName},
});

  const selectQuery = `
    SELECT * FROM users WHERE id = :id
  `;

  const [row] = await sequelize.query(selectQuery, {
    replacements: { id: idUUID },
  });

  return row[0];
}

export async function LoginUser(email,password)
{
    const query = `
    SELECT *
    FROM users
    WHERE email=:email
    `;
    const [results, metadata] = await sequelize.query(query, {
        replacements: { email },
    });
    const user = results[0];

    if (user && (await bcrypt.compare(password, user.password))) {
    const { password, createdAt, updatedAt, ...userNoPassword } = user;
    return userNoPassword;
}
}
