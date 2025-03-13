import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Shipment from './shipment.js'
import Manufacturer from './manufacturer.js'

class ReceivedShipment extends Model {}

ReceivedShipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shipments',
        key: 'id',
      },
    },
    receivedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    manufacturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manufacturers',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'receivedShipment',
  },
)

export default ReceivedShipment
