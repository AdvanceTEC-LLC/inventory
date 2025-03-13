import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class CrateLocation extends Model {}

CrateLocation.init(
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
    materialCrateDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    assemblyCrateDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'crateLocation',
  },
)

export default CrateLocation
