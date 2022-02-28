'use strict';
const { Model } = require('sequelize');
const TimeTableTodos = require('./timetable_todo');
module.exports = (sequelize, DataTypes) => {
  class TimeTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log();
    }
  }
  TimeTable.init(
    {
      user_id: DataTypes.INTEGER,

      title: DataTypes.STRING,

      published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'TimeTable',
    }
  );

  return TimeTable;
};
