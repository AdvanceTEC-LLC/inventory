import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Crate from './crate.js'

class ShelfLocation extends Model {}

ShelfLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    side: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    aisle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    shelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shelfLocation',
  },
)

export default ShelfLocation
