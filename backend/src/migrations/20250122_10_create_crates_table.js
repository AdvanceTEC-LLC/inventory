import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
    },
    crate_location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crate_locations',
        key: 'id',
      },
      allowNull: false,
    },
    shelf_location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shelf_locations',
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('crates', { cascade: true })
}
