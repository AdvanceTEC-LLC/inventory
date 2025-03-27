import { DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('sent_shipments', 'transmittal', {
    type: DataTypes.STRING,
    allowNull: true,
  })

  await queryInterface.addColumn('sent_shipments', 'project_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id',
    },
  })

  await sequelize.query(`
    UPDATE sent_shipments ss
    SET transmittal = (
        SELECT s.tracking_number 
        FROM shipments s
        WHERE s.id = ss.shipment_id
    )`)

  await sequelize.query(`
    UPDATE sent_shipments ss
    SET project_id = (
        SELECT s.project_id 
        FROM shipments s
        WHERE s.id = ss.shipment_id
    )`)

  await queryInterface.removeColumn('sent_shipments', 'shipment_id')

  await queryInterface.dropTable('shipments', { cascade: true })
}

export const down = async ({ context: queryInterface }) => {
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

  // Re-add the shipment_id column
  await queryInterface.addColumn('sent_shipments', 'shipment_id', {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'shipments',
      key: 'id',
    },
  })

  // Remove the newly added columns
  await queryInterface.removeColumn('sent_shipments', 'transmittal')
  await queryInterface.removeColumn('received_shipments', 'project_id')
}
