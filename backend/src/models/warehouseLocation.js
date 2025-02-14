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
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'warehouseLocation',
  },
)

WarehouseLocation.beforeUpdate(async (warehouse, options) => {
  if (warehouse.changed('is_default') && !warehouse.is_default) {
    const defaultCount = await WarehouseLocation.count({
      where: { is_default: true },
    })
    if (defaultCount === 1) {
      throw new Error('At least one warehouse must be the default')
    }
  }
})

WarehouseLocation.beforeDestroy(async (warehouse, options) => {
  if (warehouse.is_default) {
    const defaultCount = await WarehouseLocation.count({
      where: { is_default: true },
    })
    if (defaultCount === 1) {
      throw new Error('Cannot delete the last default warehouse')
    }
  }
})

export default WarehouseLocation
