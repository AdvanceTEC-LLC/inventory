import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Storage extends Model {}

Storage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aisle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    shelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'storage' },
)

// Add a hook to capitalize all letters
Storage.addHook('beforeSave', (instance) => {
  if (instance.col) {
    instance.col = instance.col.toUpperCase() // Capitalize all letters
  }
})

export default Storage
