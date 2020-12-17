'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Song, {through:models.Playlist})
      User.belongsToMany(models.Song, {through:models.FavouritSong})
    }
    getFullName() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate(instance, options) {
        if(!instance.last_name || instance.last_name.trim('') === '') {
          instance.last_name = instance.first_name
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};