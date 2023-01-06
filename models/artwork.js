'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.artwork.belongsTo(models.user)
      models.artwork.hasMany(models.comment)
    }
  }
  artwork.init({
    userId: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'artwork',
  });
  return artwork;
};