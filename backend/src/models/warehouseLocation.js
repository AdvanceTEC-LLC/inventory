import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class WarehouseLocation extends Model {}

WarehouseLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'warehouseLocation',
  },
)

export default WarehouseLocation
