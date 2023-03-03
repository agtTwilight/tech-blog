const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    text: {
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
            len:[1,240]
         }
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize
});

module.exports=Comment