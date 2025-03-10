import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class AssemblyCrate extends Model {}

AssemblyCrate.init(
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
    stagingAreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'staging_areas',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'AssemblyCrate',
  },
)

export default AssemblyCrate
