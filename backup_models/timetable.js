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
      this.hasMany(models.TimeTable_todo, {
        as: 'todos',
      });
      models.TimeTable_todo.belongsTo(this, {
        foreignKey: 'timetableId',
        as: 'timetable',
      });
      this.hasMany(models.TimeTable_ratings, {
        as: 'ratings',
      });
      models.TimeTable_ratings.belongsTo(this, {
        foreignKey: 'timetableId',
        as: 'timetable',
      });
      this.hasMany(models.TimeTable_used, {
        as: 'usedBy',
      });
      models.TimeTable_used.belongsTo(this, {
        foreignKey: 'timetableId',
        as: 'timetable',
      });
      this.hasMany(models.TimeTable_saved, {
        as: 'savedBy',
      });
      models.TimeTable_saved.belongsTo(this, {
        foreignKey: 'timetableId',
        as: 'timetable',
      });
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
