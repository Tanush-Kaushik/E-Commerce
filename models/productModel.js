import  sequelize  from '../db.js';
import { DataTypes } from 'sequelize';

export const products = sequelize.define("products",{  
    product_name: {
        type:DataTypes.STRING
    },
    price: { 
        type:DataTypes.INTEGER
    } 
})