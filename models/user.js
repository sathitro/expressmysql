'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Blog, {as: 'blogs'});

      // models.User.hasMany(models.Blog, 
      //   {
      //     as: 'blogs',
      //     foreignKey: 'user_id',
      //     sourceKey: 'id'
      //   }
      // );
      
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

//User.hasMany(Blog , {as: 'blogs'} ); //Will add userId to Blog model