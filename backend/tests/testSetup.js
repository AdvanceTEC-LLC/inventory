import 'dotenv/config'
import logger, { info } from '../src/util/logger.js'
import { runMigrations, sequelize } from '../src/util/db.js'

export const setupTestEnvironment = async () => {
  try {
    // Reset the database
    await resetDatabase()

    // Run all migrations to initialize the test database schema
    await runMigrations()
  } catch (error) {
    logger.error('Failed to set up test database:', error)
  }
}

const resetDatabase = async () => {
  try {
    // Check if the public schema exists
    const schemaExists = await sequelize.query(
      `SELECT schema_name 
       FROM information_schema.schemata 
       WHERE schema_name = 'public';`,
      { type: sequelize.QueryTypes.SELECT },
    )

    if (schemaExists.length > 0) {
      // Drop the public schema if it exists
      await sequelize.query('DROP SCHEMA public CASCADE;')
    } else {
      info('Public schema does not exist')
    }

    await sequelize.query('CREATE SCHEMA public;')
  } catch (err) {
    logger.error('Failed to reset database schema:', err)
    throw err
  }
}

export const tearDownTestEnvironment = async () => {
  try {
    await sequelize.close()
    info('Database connection closed')
  } catch (err) {
    logger.error('Failed to close database connection:', err)
  }
}
