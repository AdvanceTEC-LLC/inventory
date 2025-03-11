import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('crate_locations', {
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
    material_crate_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    assembly_crate_default: {
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

  const crateLocations = [
    { name: 'Shipping Bay', material_crate_default: true },
    { name: 'Shelves' },
    { name: 'Holding Bay', assembly_crate_default: true },
    { name: 'Staging Area' },
    { name: 'Shipped' },
    { name: 'Delivered' },
  ]

  await queryInterface.bulkInsert('crate_locations', crateLocations)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('crate_locations', { cascade: true })
}
