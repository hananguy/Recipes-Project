/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('(UUID())'),
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      ingredients: {
        type: Sequelize.JSON
      },
      instructions: {
        type: Sequelize.JSON
      },
      cookingTime: {
        type: Sequelize.INTEGER
      },
      servings: {
        type: Sequelize.INTEGER
      },
      difficulty: {
        type: Sequelize.ENUM('easy', 'medium', 'hard')
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',   // טבלת Users
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};
