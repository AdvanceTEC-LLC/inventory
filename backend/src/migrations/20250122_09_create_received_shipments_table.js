import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('received_shipments', {
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
    received_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manufacturers',
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
  await queryInterface.dropTable('received_shipments', { cascade: true })
}
