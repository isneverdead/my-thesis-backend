'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubCriteria.init(
    {
      criteria_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      weight_value: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: 'SubCriteria',
    }
  );
  return SubCriteria;
};
