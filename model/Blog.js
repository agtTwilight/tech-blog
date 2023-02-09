const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    post: {
         type: DataTypes.STRING,
         allowNull:false,
    }
},{
    sequelize
});

module.exports=Blog