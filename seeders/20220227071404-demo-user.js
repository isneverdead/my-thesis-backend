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
    return queryInterface.bulkInsert('users', [
      {
        name: 'user 1',
        email: 'user1@local.com',
        password: '12345',
        job: null,
        target: null,
        gender: null,
        birthday: null,
        profile_url: null,
        role: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user 2',
        email: 'user2@local.com',
        password: '12345',
        job: null,
        target: null,
        gender: null,
        birthday: null,
        profile_url: null,
        role: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user 3',
        email: 'user3@local.com',
        password: '12345',
        job: null,
        target: null,
        gender: null,
        birthday: null,
        profile_url: null,
        role: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  },
};
