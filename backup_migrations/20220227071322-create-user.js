'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(20),
      },
      job: {
        type: Sequelize.STRING(15),
      },
      target: {
        type: Sequelize.STRING(15),
      },
      gender: {
        type: Sequelize.STRING(10),
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      profile_url: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.INTEGER(1),
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
    await queryInterface.dropTable('Users');
  },
};
