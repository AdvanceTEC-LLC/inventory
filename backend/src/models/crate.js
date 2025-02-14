import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import WarehouseLocation from './warehouseLocation.js'

class Crate extends Model {}

Crate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
    },
    warehouseLocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'warehouse_locations',
        key: 'id',
      },
      allowNull: false,
      defaultValue: async () => {
        const defaultWarehouse = await WarehouseLocation.findOne({
          where: { isDefault: true },
        })
        return defaultWarehouse.id
      },
    },
    shelfLocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shelf_locations',
        key: 'id',
      },
    },
    stagingAreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'staging_areas',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    opened: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'crate',
  },
)

export default Crate
