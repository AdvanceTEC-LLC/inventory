import { DataTypes } from 'sequelize'

const generateShelfLocations = () => {
  const shelfLocations = []

  const addLocations = (aisleRange, colCount, shelfCount) => {
    for (const aisle of aisleRange) {
      for (let col = 1; col <= colCount; col++) {
        for (let shelf = 1; shelf <= shelfCount; shelf++) {
          shelfLocations.push({
            side: 'A'.trim(),
            aisle,
            col: col.toString().trim(), // Convert col to string for consistency
            shelf,
            created_at: new Date(),
            updated_at: new Date(),
          })
        }
      }
    }
  }

  addLocations([10, 11], 10, 6) // Aisles 10 & 11: 10 Columns, 6 Rows
  addLocations([12, 13], 9, 6) // Aisles 12 & 13: 9 Columns, 6 Rows
  addLocations([14], 9, 5) // Aisle 14: 9 Columns, 5 Rows
  addLocations([15, 16, 17], 9, 4) // Aisles 15-17: 9 Columns, 4 Rows

  return shelfLocations
}

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('shelf_locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    side: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aisle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  // Generate shelf locations for side "A" using the specified configurations
  const shelfLocations = generateShelfLocations()
  await queryInterface.bulkInsert('shelf_locations', shelfLocations)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('shelf_locations', { cascade: true })
}
