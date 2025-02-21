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

  const warehouseLocations = [
    { name: 'Shipping Bay', is_default: true },
    { name: 'Shelves' },
    { name: 'Holding Bay' },
    { name: 'Staging Area' },
    { name: 'Shipped' },
    { name: 'Delivered' },
  ]

  await queryInterface.bulkInsert('warehouse_locations', warehouseLocations)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('warehouse_locations', { cascade: true })
}
