import express from 'express'; 
import { login, logout, refresh, register } from '../controllers/auth.js';
import { isAuthenticated } from '../helper/auth.js';

export const userRouter = express.Router()

userRouter.post('/register', (req, res) => {
    try {
        register(req,res)
    } catch (error) {
        return res.json(error)
    }
})

userRouter.post('/login', (req, res) => {
    try {
        login(req,res)
    } catch (error) {
        return res.json(error)
    }
})

userRouter.get('/logout', isAuthenticated, (req, res) => {
    try {
        logout(req,res)
    } catch (error) {
        return res.json(error);
    }
})

userRouter.post('/refresh', (req, res) => {
    try {
        refresh(req,res)
    } catch (error) {
        return res.json(error)
    }
})
