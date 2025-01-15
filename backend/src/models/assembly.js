import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Assembly extends Model {}

Assembly.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identifier: { type: DataTypes.STRING, unique: true, allowNull: false },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'assembly',
    tableName: 'assemblies',
  },
)

export default Assembly
