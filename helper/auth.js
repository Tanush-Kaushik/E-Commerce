import jwt from 'jsonwebtoken';
import { models } from '../models/index.js';

export const isAuthenticated = async(req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // @ts-ignore
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await models.users.findOne({
          where: {
              email:decode.user.email
          }
      });      
      next();                             
  } else {
    res.json({
      message: 'Login first',
    });
  }
};
