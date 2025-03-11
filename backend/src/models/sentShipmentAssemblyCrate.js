import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class SentShipmentAssemblyCrate extends Model {}

SentShipmentAssemblyCrate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sentShipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'sentShipments', key: 'id' },
    },
    assemblyCrateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'assemblyCrates', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'sentShipmentAssemblyCrate',
  },
)

export default SentShipmentAssemblyCrate
