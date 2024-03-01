const config = {
  development: {
    username: 'root',
    password: 'hello123',
    database: 'newTemp',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'hello123',
    database: 'temp',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

export default config;
