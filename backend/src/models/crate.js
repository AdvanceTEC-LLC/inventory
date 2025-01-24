import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Project from './project.js'
import CrateStock from './crateStock.js'
import ShipmentCrate from './shipmentCrate.js'
import ShelfLocation from './shelfLocation.js'
import Shipment from './shipment.js'
import Stock from './stock.js'
import WarehouseLocation from './warehouseLocation.js'
import StagingArea from './stagingArea.js'
import CrateAssemblies from './crateAssemblies.js'
import Assembly from './assembly.js'

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
    /*validate: {
      storageRequiresStorageId() {
        if (this.location === 'Storage' && this.storageId === null) {
          throw new Error('Crates in "Storage" location must have a storageId.')
        }
      },
    },*/
  },
)

/*
// Add hook to enforce crates in 'Storage' locations to have a storageId
Crate.addHook('beforeValidate', (crate) => {
  if (crate.location === 'Storage' && crate.storageId === null) {
    throw new Error('Crates in "Storage" location must have a storageId.')
  }
})
*/

export default Crate
