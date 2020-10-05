'use strict';
const { Model } = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {

    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    };

    Blog.init(
        {
        // id: {
        //   type: DataTypes.INTEGER,
        //   autoIncrement: true,
        //   primaryKey: true
        // },
        title: DataTypes.STRING(200),
        created_at : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        } 
        }, 
        {
        sequelize,
        tableName: 'blogs',
        modelName: 'Blogs',
        timestamps: false
        }
    );
    
    return Blog;
};

Blog.belongsTo(User); //Will add userId to Blog model