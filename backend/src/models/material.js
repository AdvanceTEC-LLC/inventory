import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Manufacturer from './manufacturer.js'
import Stock from './stock.js'
import Assembly from './assembly.js'
import AssemblyMaterial from './assemblyMaterials.js'
import Division from './division.js'

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    manufacturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manufacturers',
        key: 'id',
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    divisionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'divisions',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'material',
  },
)

export default Material
