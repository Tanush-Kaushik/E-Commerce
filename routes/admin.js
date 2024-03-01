import express from 'express'
import { deleteUser, getDetails } from '../controllers/admin.js'

export const adminRouter = express.Router()

adminRouter.get('/getDetails', (req, res) => {
    try {
        getDetails(req,res)
    } catch (error) {
        return res.json(error)
    }
})

adminRouter.post('/deleteUser', (req, res) => {
    try {
        deleteUser(req,res)
    } catch (error) {
        return res.json(error)
    }
})