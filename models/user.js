'use strict';
const { Model } = require('sequelize');
const Blog = require('./blog');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init(
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true
      // },
      name: DataTypes.STRING(200),
      password: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      created_at : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      } 
    }, 
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: false
    }
  );
  
  return User;
};

User.hasMany(Blog); //Will add userId to Blog model