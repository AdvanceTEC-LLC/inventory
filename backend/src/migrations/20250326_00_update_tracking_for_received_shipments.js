import { DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

export const up = async ({ context: queryInterface }) => {
  await Promise.all([
    queryInterface.addColumn('received_shipments', 'tracking_number', {
      type: DataTypes.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('received_shipments', 'purchase_order', {
      type: DataTypes.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('received_shipments', 'order_acknowledgement', {
      type: DataTypes.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('received_shipments', 'sales_order', {
      type: DataTypes.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('received_shipments', 'project_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
    }),
  ])

  await sequelize.query(`
    UPDATE received_shipments rs
    SET tracking_number = (
        SELECT s.tracking_number 
        FROM shipments s
        WHERE s.id = rs.shipment_id
    )`)

  await queryInterface.removeColumn('received_shipments', 'shipment_id')
}

export const down = async ({ context: queryInterface }) => {
  // Re-add the shipment_id column
  await queryInterface.addColumn('received_shipments', 'shipment_id', {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'shipments',
      key: 'id',
    },
  })

  // Remove the newly added columns
  await queryInterface.removeColumn('received_shipments', 'tracking_number')
  await queryInterface.removeColumn('received_shipments', 'purchase_order')
  await queryInterface.removeColumn(
    'received_shipments',
    'order_acknowledgement',
  )
  await queryInterface.removeColumn('received_shipments', 'sales_order')
  await queryInterface.removeColumn('received_shipments', 'project_id')
}
