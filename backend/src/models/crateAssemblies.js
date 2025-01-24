import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Crate from './crate.js'
import Assembly from './assembly.js'

class CrateAssemblies extends Model {}

CrateAssemblies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    crateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'crates', key: 'id' },
    },
    assemblyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'assemblies', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'crateAssemblies',
    tableName: 'crate_stock',
  },
)

export default CrateAssemblies
