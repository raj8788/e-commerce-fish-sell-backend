import sequelize from "../config/db.js";
import { DataTypes } from 'sequelize';


const categoryModel = sequelize.define('Category',{

    id:{
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },

    category_id:{
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    
    category_name:{
        type: DataTypes.STRING(100),
        allowNull:false
    },

},{
    tableName:'categories',
    timestamps:true,
    indexes:[
        {
            fields:["category_name"]
        }
    ]
})

export default categoryModel;