'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(models.User, {through:models.Playlist})
      Song.belongsToMany(models.User, {through:models.FavouritSong})
    }

    get fullTitle() {
      return `${this.artist} - ${this.title}`
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    released_date: DataTypes.STRING,
    youtubeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};