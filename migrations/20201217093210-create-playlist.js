'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      
      },
      SongId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Songs'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      
      },
      playlist_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Playlists');
  }
};