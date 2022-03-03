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
      'TimeTable_todos',
      [
        {
          timetableId: 2,
          activity: 'Bangun Pagi',
          startAt: '2022-02-27T07:00:00.000Z',
          endAt: '2022-02-27T08:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Makan Pagi',
          startAt: '2022-02-27T08:00:01.000Z',
          endAt: '2022-02-27T09:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Kerja',
          startAt: '2022-02-27T09:00:01.000Z',
          endAt: '2022-02-27T10:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'istirahat',
          startAt: '2022-02-27T10:00:01.000Z',
          endAt: '2022-02-27T15:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Kerja lagi',
          startAt: '2022-02-27T15:00:01.000Z',
          endAt: '2022-02-27T17:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Pulang',
          startAt: '2022-02-27T17:00:01.000Z',
          endAt: '2022-02-27T18:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Makan malam',
          startAt: '2022-02-27T18:00:01.000Z',
          endAt: '2022-02-27T19:00:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          timetableId: 2,
          activity: 'Tidur',
          startAt: '2022-02-27T19:00:01.000Z',
          endAt: '2022-02-27T23:00:00.000Z',
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
    await queryInterface.bulkDelete('TimeTable_todos', null, {});
  },
};
