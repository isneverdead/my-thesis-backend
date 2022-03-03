'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'TimeTable_ratings',
      [
        {
          timetableId: 2,
          userId: 4,
          rate: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          userId: 2,
          rate: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          userId: 3,
          rate: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TimeTable_ratings', null, {});
  },
};
