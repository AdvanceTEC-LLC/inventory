import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
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
    location: {
      type: DataTypes.ENUM(
        'Shipping Bay',
        'Storage',
        'Staging Zone 1',
        'Staging Zone 2',
        'In Transit',
        'Delivered',
      ),
      allowNull: false,
    },
    storageId: {
      type: DataTypes.INTEGER,
      references: { model: 'storages', key: 'id' },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'vendors', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'crate',
    validate: {
      storageRequiresStorageId() {
        if (this.location === 'Storage' && this.storageId === null) {
          throw new Error('Crates in "Storage" location must have a storageId.')
        }
      },
    },
  },
)

// Add hook to enforce crates in 'Storage' locations to have a storageId
Crate.addHook('beforeValidate', (crate) => {
  if (crate.location === 'Storage' && crate.storageId === null) {
    throw new Error('Crates in "Storage" location must have a storageId.')
  }
})

export default Crate
