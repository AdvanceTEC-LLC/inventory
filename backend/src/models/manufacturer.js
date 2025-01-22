import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class Manufacturer extends Model {}

Manufacturer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'manufacturer',
  },
)

export default Manufacturer
