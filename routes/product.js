import express from 'express';
import { checkOut, loadData } from '../controllers/orders.js';
import { getHistory } from '../controllers/history.js';
import { isAuthenticated } from '../helper/auth.js';

export const productRouter = express.Router()

productRouter.get('/loadData', (req, res) => {
  try {
    loadData(req, res);
  } catch (error) {
    return res.json(error);
  }
});

productRouter.post('/checkOut', isAuthenticated, (req, res) => {
  try {
    checkOut(req, res);
  } catch (error) {
    return res.json(error);
  }
});

productRouter.get('/getHistory',isAuthenticated,(req, res)=> {
    try {
        getHistory(req,res)
    } catch (error) {
        return res.json(error)
    }
})  
