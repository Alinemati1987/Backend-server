"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Oh my gosh",
          imageUrl: "https://source.unsplash.com/1600x900/?surprise",
          content: "I must explain to you how all this mistaken idea was born",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "I like turtles",
          imageUrl: "https://source.unsplash.com/1600x900/?turtles",
          content: "Teenage Mutant Ninja Turtles",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Lets see what happend with pizza",
          imageUrl:
            "https://thumbs.dreamstime.com/b/woman-taking-slice-hot-cheese-pizza-margherita-table-closeup-138142081.jpg",
          content: "I like it",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Do you know what it feels like for a Dummy?",
          imageUrl: "https://source.unsplash.com/1600x900/?dummy",
          content: "Somebody once told me the world is gonna roll me",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
