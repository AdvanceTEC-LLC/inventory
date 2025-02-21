import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Project from './project.js'
import Crate from './crate.js'

class StagingArea extends Model {}

StagingArea.init(
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
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'stagingArea',
  },
)

export default StagingArea
