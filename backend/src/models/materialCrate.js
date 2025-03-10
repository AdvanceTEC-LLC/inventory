import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class MaterialCrate extends Model {}

MaterialCrate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    crateId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crates',
        key: 'id',
      },
      allowNull: false,
    },
    opened: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'materialCrate',
  },
)

export default MaterialCrate
