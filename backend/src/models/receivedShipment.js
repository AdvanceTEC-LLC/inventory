import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class ReceivedShipment extends Model {}

ReceivedShipment.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'receivedShipment',
  },
)

export default ReceivedShipment
