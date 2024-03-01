import express from 'express';
import { config } from 'dotenv';
import sequelize from './db.js';
import router from './routes/index.js';
import { adminRouter } from './routes/admin.js';
import cookieParser from 'cookie-parser';
import { redisConnect } from './middleware/redisCacher.js';
import { dailyBackupConfig } from './backup/index.js';

config({ path: './.env' });
const app = express();
app.use(express.json());
redisConnect()
dailyBackupConfig()

if (process.env.DIALECT == 'mysql') {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // await sequelize.sync({ force: true });
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(cookieParser());
  app.use('/api', router);
  app.use('/admin', adminRouter);

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
} else if (process.env.DIALECT == 'postgres') {
  // code
}
