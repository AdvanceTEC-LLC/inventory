import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('warehouse_locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  await queryInterface.addConstraint('warehouse_locations', {
    fields: ['is_default'],
    type: 'unique',
    name: 'unique_default_warehouse',
    where: { is_default: true },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('warehouse_locations', { cascade: true })
}
