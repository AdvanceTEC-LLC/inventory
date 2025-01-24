import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Project from './project.js'
import ShipmentCrate from './shipmentCrate.js'
import Manufacturer from './manufacturer.js'
import Crate from './crate.js'
import ReceivedShipment from './receivedShipment.js'
import SentShipment from './sentShipment.js'

class Shipment extends Model {}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trackingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shipment',
  },
)

export default Shipment
