'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeTable_todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TimeTable_todo.init({
    timetable_id: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    start_at: DataTypes.DATE,
    end_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TimeTable_todo',
  });
  return TimeTable_todo;
};