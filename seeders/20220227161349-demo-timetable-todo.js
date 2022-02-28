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
      'timetable_todos',
      [
        {
          timetable_id: 3,
          activity: 'Bangun Pagi',
          start_at: '2022-02-27T07:00:00.000Z',
          end_at: '2022-02-27T08:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Makan Pagi',
          start_at: '2022-02-27T08:00:01.000Z',
          end_at: '2022-02-27T09:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Kerja',
          start_at: '2022-02-27T09:00:01.000Z',
          end_at: '2022-02-27T10:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'istirahat',
          start_at: '2022-02-27T10:00:01.000Z',
          end_at: '2022-02-27T15:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Kerja lagi',
          start_at: '2022-02-27T15:00:01.000Z',
          end_at: '2022-02-27T17:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Pulang',
          start_at: '2022-02-27T17:00:01.000Z',
          end_at: '2022-02-27T18:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Makan malam',
          start_at: '2022-02-27T18:00:01.000Z',
          end_at: '2022-02-27T19:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetable_id: 3,
          activity: 'Tidur',
          start_at: '2022-02-27T19:00:01.000Z',
          end_at: '2022-02-27T23:00:00.000Z',
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
    await queryInterface.bulkDelete('timetable_todos', null, {});
  },
};
