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
      'timetable_ratings',
      [
        {
          timetable_id: 2,
          user_id: 1,
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 2,
          user_id: 2,
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 2,
          user_id: 3,
          rating: 5,
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
    await queryInterface.bulkDelete('timetable_ratings', null, {});
  },
};
