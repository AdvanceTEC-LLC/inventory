import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Crate from './crate.js'
import Shipment from './shipment.js'

class ShipmentCrate extends Model {}

ShipmentCrate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'shipments', key: 'id' },
    },
    crateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'crates', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shipmentCrate',
  },
)

export default ShipmentCrate
