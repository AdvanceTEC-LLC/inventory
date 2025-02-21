import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('staging_areas', {
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
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
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

  const stagingAreas = [
    { name: 'Staging Area 1' },
    { name: 'Staging Area 2' },
    { name: 'Staging Area 3' },
  ]

  await queryInterface.bulkInsert('staging_areas', stagingAreas)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('staging_areas', { cascade: true })
}
