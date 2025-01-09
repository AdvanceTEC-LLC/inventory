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
    partNumber: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    thickness: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    squareFeet: DataTypes.FLOAT,
    topFinish: DataTypes.STRING,
    bottomFinish: DataTypes.STRING,
    xDimension: DataTypes.INTEGER,
    cutout: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tag: DataTypes.STRING,
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'vendors', key: 'id' },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'material' },
)

export default Material
