import  sequelize  from "../db.js";
import { DataTypes } from "sequelize";

export const orders = sequelize.define("orders", {
    email: {
        type:DataTypes.STRING
    }, 
    product_name: {
        type:DataTypes.STRING
    }
})
