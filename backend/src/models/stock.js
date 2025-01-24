import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Project from './project.js'
import Material from './material.js'
import Crate from './crate.js'
import CrateStock from './crateStock.js'

class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materials',
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
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'stock',
    tableName: 'stock',
  },
)

export default Stock
