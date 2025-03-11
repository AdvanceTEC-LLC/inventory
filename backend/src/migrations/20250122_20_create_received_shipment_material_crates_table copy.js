import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('received_shipment_material_crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    received_shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'received_shipments',
        key: 'id',
      },
    },
    material_crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'material_crates',
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
  await queryInterface.dropTable('received_shipment_material_crates', {
    cascade: true,
  })
}
