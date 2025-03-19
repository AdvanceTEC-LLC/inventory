import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('shipments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  await queryInterface.dropTable('shipments', { cascade: true })
}
