'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User)
      Playlist.belongsTo(models.Song)
    }
  };
  Playlist.init({
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER,
    playlist_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};