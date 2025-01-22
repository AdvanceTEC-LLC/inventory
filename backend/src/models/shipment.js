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
    tracking_number: {
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
