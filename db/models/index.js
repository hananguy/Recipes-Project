import fs from 'fs';
import path from 'path';
import process from 'process';
import Sequelize from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

const basename = path.basename(fileURLToPath(import.meta.url));
const env = process.env.NODE_ENV || 'development';

import configAll from '../config/config.js';
const config = configAll[env];

const db = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  );

for (const file of modelFiles) {
  const moduleUrl = pathToFileURL(path.join(__dirname, file)).href;
  const { default: defineModel } = await import(moduleUrl);
  const model = defineModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default db;

