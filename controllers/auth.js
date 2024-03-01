import jwt from 'jsonwebtoken';
import { models } from '../models/index.js';
import { users } from '../models/userModels.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userCheck = await models.users.findAll({
    where: {
      email,
    },
  });

  if (userCheck.length != 0) {
    return res.json({
      success: false,
      message: 'User already exists',
    });
  }

  await models.users.create({
    name,
    email,
    password,
  });
  return res.json({
    success: true,
    message: 'Registered successfully',
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userCheck = await models.users.findAll({
    where: {
      email,
    },
  });

  if (userCheck.length == 0) {
    return res.json({
      success: false,
      message: 'User not found',
    });
  }

  if (password == userCheck[0].dataValues.password) {
    const authToken = jwt.sign(
      {
        user: {
          email,
        },
      },
      // @ts-ignore
      process.env.SECRET_KEY,
    );

    const refreshToken = jwt.sign(
      {
        user: {
          email,
        },
      },
      // @ts-ignore
      process.env.REFRESH_KEY,
    );

    res.cookie('token', authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000 * 60),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000 * 60 * 24 * 30),
    });

    return res.json({
      success: true,
      message: 'Login successfull',
    });
  }
  return res.json({
    success: false,
    message: 'Invalid credentials',
  });
};

export const logout = (req, res) => {
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.json({
    success: true,
    message: 'Logged out',
  });
};

export const refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  // @ts-ignore
  const decode = jwt.verify(refreshToken, process.env.REFRESH_KEY);

  const authToken = jwt.sign(
    {
      user: {
        email:decode.user.email,
      },
    },
    // @ts-ignore
    process.env.SECRET_KEY,
  );

  res.cookie('token', authToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000 * 60),
  });

  return res.json({
    success: true,
    message:"New authToken created"
  })
};
