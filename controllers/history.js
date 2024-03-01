import { models } from "../models/index.js";


export const getHistory = async (req, res) => {

    const email = req.user.dataValues.email;
    
    let products = []
    
    const history = await models.orders.findAll({
        where: {
            email
        }
    })

    if (history.length == 0) {
        return res.json({
            success: true,
            message:"User hasn't ordered anything"
        })
    }

    history.map(i => {
        products.push({
            product_name: i.dataValues.product_name,
            date:i.dataValues.createdAt
        })
    })

    return res.json({
        success: true,
        products
    })
};  
