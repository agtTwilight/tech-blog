const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    blog: {
         type: DataTypes.STRING,
         allowNull:false,
    }
},{
    sequelize
});

module.exports=Blog