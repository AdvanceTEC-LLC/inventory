import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('assembly_crate_assemblies', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assembly_crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assembly_crates',
        key: 'id',
      },
    },
    assembly_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assemblies',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('assembly_crate_assemblies', { cascade: true })
}
