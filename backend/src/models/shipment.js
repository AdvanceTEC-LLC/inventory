import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Shipment extends Model {}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    direction: {
      type: DataTypes.ENUM('In', 'Out'),
      allowNull: false,
    },
    sendDate: { type: DataTypes.DATE, allowNull: false },
    receivedDate: DataTypes.DATE,
    projectId: {
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' },
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      references: { model: 'vendors', key: 'id' },
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
