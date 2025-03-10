import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('sent_shipment_assembly_crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sent_shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sent_shipments',
        key: 'id',
      },
    },
    assembly_crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assembly_crates',
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
  await queryInterface.dropTable('sent_shipment_assembly_crates', {
    cascade: true,
  })
}
