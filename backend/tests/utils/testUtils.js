import { expect } from 'vitest'
import logger, { info, error } from '../../src/util/logger.js'
import { sequelize } from '../../src/util/db.js'

let manufacturerCount = 0
let materialCount = 0
let projectCount = 0

export const clearDatabase = async () => {
  try {
    // Get all table names
    const tables = await sequelize.query(
      // eslint-disable-next-line quotes
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
      { type: sequelize.QueryTypes.SELECT },
    )

    // Disable foreign key checks, truncate all tables, then re-enable foreign key checks
    await sequelize.query('SET CONSTRAINTS ALL DEFERRED')

    for (const { tablename } of tables) {
      if (tablename !== 'migrations') {
        // Don't truncate migrations table
        await sequelize.query(`TRUNCATE TABLE "${tablename}" CASCADE`)
      }
    }

    await sequelize.query('SET CONSTRAINTS ALL IMMEDIATE')

    // Reset counters after clearing database
    manufacturerCount = 0
    materialCount = 0
    projectCount = 0

    info('Tables cleared for new test')
  } catch (err) {
    error('Failed to clear tables:', err)
    throw err
  }
}

export const createTestManufacturer = async (data = {}) => {
  manufacturerCount++
  return await sequelize.models.manufacturer.create({
    name: `Test Manufacturer ${manufacturerCount}`,
    ...data,
  })
}

export const createTestMaterial = async (data = {}) => {
  materialCount++
  const manufacturer = await createTestManufacturer()
  return await sequelize.models.material.create({
    name: `Test Material ${materialCount}`,
    manufacturerId: manufacturer.id,
    ...data,
  })
}

export const createTestProject = async (data = {}) => {
  projectCount++
  return await sequelize.models.project.create({
    number: 25000,
    name: `Test Project ${projectCount}`,
    ...data,
  })
}
