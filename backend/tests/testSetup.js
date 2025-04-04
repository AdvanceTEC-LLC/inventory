import { afterAll, beforeEach } from 'vitest'
import { runMigrations, sequelize } from '../src/util/db.js'
import logger from '../src/util/logger.js'

export const dropAllTables = async () => {
  try {
    // Drop all tables with CASCADE to remove dependencies
    await sequelize.query('DROP SCHEMA public CASCADE')
    await sequelize.query('CREATE SCHEMA public')
  } catch (error) {
    logger.error('Failed to drop tables:', error)
    throw error
  }
}

export const setupTestDatabase = async () => {
  try {
    // Authenticate connection
    await sequelize.authenticate()

    // Ensure completely clean state by dropping and recreating the schema
    await dropAllTables()
    await runMigrations()
  } catch (error) {
    logger.error('Test database setup failed:', error)
    throw error
  }
}

afterAll(async () => {
  // Add optional cleanup
  try {
    await sequelize.close()
  } catch (error) {
    logger.error('Failed to close database connection:', error)
  }
})

beforeEach(async () => {
  // Reset database state before each test
  await setupTestDatabase()
})
