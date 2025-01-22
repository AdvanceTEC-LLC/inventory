import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class AssemblyMaterial extends Model {}

AssemblyMaterial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assemblyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'assemblies', key: 'id' },
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'materials', key: 'id' },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'assemblyMaterial',
    tableName: 'assembly_materials',
  },
)

export default AssemblyMaterial
