import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Shipment from './shipment.js'

class SentShipment extends Model {}

SentShipment.init(
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
    sendDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'sentShipment',
  },
)

export default SentShipment
