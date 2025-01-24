import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Material from './material.js'

class Division extends Model {}

Division.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
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
    modelName: 'division',
  },
)

export default Division
