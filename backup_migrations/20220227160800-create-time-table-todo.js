'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeTable_todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timetable_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      activity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TimeTable_todos');
  },
};
