import { Sequelize } from 'sequelize';
import config from './config/config.js';

const mode = process.env.NODE_ENV;
const { development, test } = config;
let sequelize = {}; 

if (mode == 'development') {
  sequelize = new Sequelize(development.database,development.username,development.password,{
      host: development.host,
      dialect: 'mysql',
    },
  );
} else if (mode == 'test') {
  sequelize = new Sequelize(test.database, test.username, test.password, {
    host: test.host,
    dialect: 'mysql',
  });
}

export default sequelize;
