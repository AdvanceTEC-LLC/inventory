import { test, describe, beforeEach, expect, afterAll } from 'vitest'
import supertest from 'supertest'
import app from '../src/app'
import helper from './helper'
import { Manufacturer } from '../src/models'
import { setupTestEnvironment, tearDownTestEnvironment } from './testSetup'

const api = supertest(app)

beforeEach(async () => {
  await setupTestEnvironment()
})

afterAll(async () => {
  tearDownTestEnvironment()
})

describe('no data in the database', () => {
  describe('get', () => {
    test('get returns an empty array', async () => {
      const response = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(0)
    })

    test('get ID returns an error', async () => {
      const response = await api
        .get('/api/manufacturers/0')
        .expect(404)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty(
        'message',
        'Manufacturer with id 0 not found',
      )
    })
  })

  describe('post', () => {
    test('post returns the created data', async () => {
      const response = await api
        .post('/api/manufacturers')
        .send(helper.newManufacturer)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.name).toContain(helper.newManufacturer.name)
    })
  })
})

describe('data in the database', () => {
  beforeEach(async () => {
    await Manufacturer.bulkCreate(helper.initialManufacturers)
  })

  describe('get', () => {
    test('get returns array with correct length and data', async () => {
      const response = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(helper.initialManufacturers.length)
      const names = response.body.map((manufacturer) => manufacturer.name)
      expect(names).toContain(helper.initialManufacturers[0].name)
    })

    test('get ID returns correct data', async () => {
      const response = await api
        .get('/api/manufacturers/0')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.name).toContain(helper.initialManufacturers[0].name)
    })
  })

  /*describe('post', () => {
    test('post returns error if name is not unique', async () => {
      const duplicateManufacturer = {
        name: helper.initialManufacturers[0].name,
      }
      const response = await api
        .post('/api/manufacturers')
        .send(duplicateManufacturer)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty(
        'error',
        'SequelizeUniqueConstraintError',
      )
    })

    test('post returns error if name is null', async () => {
      const nullName = { name: null }
      const response = await api
        .post('/api/manufacturers')
        .send(nullName)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty('error', 'SequelizeValidationError')
    })
  })*/

  describe('delete', () => {
    test('delete ID returns error and doesnt change the data', async () => {
      const vendosBefore = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .delete('/api/manufacturers/2')
        .expect(404)
        .expect('Content-Type', /application\/json/)

      const manufacturersAfter = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(vendosBefore.length).equals(manufacturersAfter.length)

      expect(response.body).toHaveProperty(
        'message',
        'Manufacturer with id 2 not found',
      )
    })

    test('delete ID removes data', async () => {
      const manufacturersBefore = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api.delete('/api/manufacturers/0').expect(204)

      const manufacturersAfter = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(manufacturersBefore.body.length - 1).equals(
        manufacturersAfter.body.length,
      )
    })

    test('delete all removes all data', async () => {
      await api.delete('/api/manufacturers').expect(204)

      const manufacturersAfter = await api
        .get('/api/manufacturers')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(manufacturersAfter.body.length).equals(0)
    })
  })
})
