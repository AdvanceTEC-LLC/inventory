import { test, describe, beforeEach, expect, afterAll } from 'vitest'
import supertest from 'supertest'
import app from '../src/app'
import helper from './helper'
import { Vendor } from '../src/models'
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
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(0)
    })

    test('get ID returns an error', async () => {
      const response = await api
        .get('/api/vendors/0')
        .expect(404)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty(
        'message',
        'Vendor with id 0 not found',
      )
    })
  })

  describe('post', () => {
    test('post returns the created data', async () => {
      const response = await api
        .post('/api/vendors')
        .send(helper.newVendor)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.name).toContain(helper.newVendor.name)
    })
  })
})

describe('data in the database', () => {
  beforeEach(async () => {
    await Vendor.bulkCreate(helper.initialVendors)
  })

  describe('get', () => {
    test('get returns array with correct length and data', async () => {
      const response = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(helper.initialVendors.length)
      const names = response.body.map((vendor) => vendor.name)
      expect(names).toContain(helper.initialVendors[0].name)
    })

    test('get ID returns correct data', async () => {
      const response = await api
        .get('/api/vendors/0')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.name).toContain(helper.initialVendors[0].name)
    })
  })

  describe('post', () => {
    test('post returns error if name is not unique', async () => {
      const duplicateVendor = { name: helper.initialVendors[0].name }
      const response = await api
        .post('/api/vendors')
        .send(duplicateVendor)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty(
        'error',
        'SequelizeUniqueConstraintError',
      )
    })

    test('post returns error name is null', async () => {
      const duplicateVendor = { name: null }
      const response = await api
        .post('/api/vendors')
        .send(duplicateVendor)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty('error', 'SequelizeValidationError')
    })
  })

  describe('delete', () => {
    test('delete ID returns error and doesnt change the data', async () => {
      const vendosBefore = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .delete('/api/vendors/2')
        .expect(404)
        .expect('Content-Type', /application\/json/)

      const vendorsAfter = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(vendosBefore.length).equals(vendorsAfter.length)

      expect(response.body).toHaveProperty(
        'message',
        'Vendor with id 2 not found',
      )
    })

    test('delete ID removes data', async () => {
      const vendorsBefore = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api.delete('/api/vendors/0').expect(204)

      const vendorsAfter = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(vendorsBefore.body.length - 1).equals(vendorsAfter.body.length)
    })

    test('delete all removes all data', async () => {
      await api.delete('/api/vendors').expect(204)

      const vendorsAfter = await api
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(vendorsAfter.body.length).equals(0)
    })
  })
})
