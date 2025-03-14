import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

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
      unique: true,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      defaultValue: 'ea',
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
