import sequelize  from "../db.js";
import { DataTypes } from "sequelize";

export const users = sequelize.define("users", {
    name: {
        type:DataTypes.STRING
    },
    email: {
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
})
 