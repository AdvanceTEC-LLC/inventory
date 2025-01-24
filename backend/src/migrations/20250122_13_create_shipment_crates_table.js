import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('shipment_crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shipments',
        key: 'id',
      },
    },
    crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crates',
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
  await queryInterface.dropTable('shipment_crates', { cascade: true })
}
