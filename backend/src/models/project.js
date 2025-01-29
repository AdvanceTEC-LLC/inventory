import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Crate from './crate.js'
import Shipment from './shipment.js'
import Assembly from './assembly.js'
import StagingArea from './stagingArea.js'
import Stock from './stock.js'

class Project extends Model {}

Project.init(
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
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'project',
  },
)

export default Project
