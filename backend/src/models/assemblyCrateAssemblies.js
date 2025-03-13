import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class AssemblyCrateAssemblies extends Model {}

AssemblyCrateAssemblies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assemblyCrateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'assembly_crates', key: 'id' },
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
    modelName: 'assemblyCrateAssemblies',
  },
)

export default AssemblyCrateAssemblies
