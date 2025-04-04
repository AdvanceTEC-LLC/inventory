import { test, describe, expect } from 'vitest'
import { createTestManufacturer } from '../utils/testUtils'
import api from '../utils/apiHelper'
import {
  expectValidationError,
  expectNotFoundError,
} from '../utils/expectErrors'
import { info } from '../../src/util/logger'

describe('Materials API', () => {
  describe('GET /api/materials', () => {
    test('returns empty array when no materials exist', async () => {
      const response = await api.get('/api/materials')
      expect(response.body).toHaveLength(0)
    })

    test('returns all materials', async () => {
      const manufacturer = await createTestManufacturer()
      const material = await api.post('/api/materials', {
        name: 'Test Material',
        manufacturerId: manufacturer.id,
        unit: 'each',
      })
      const response = await api.get('/api/materials')
      expect(response.body).toHaveLength(1)
      expect(response.body[0].id).toBe(material.body.id)
    })
  })

  describe('GET /api/materials/:id', () => {
    test('returns 404 for non-existent material', async () => {
      const id = 999
      const response = await api.get(`/api/materials/${id}`, 404)
      expectNotFoundError(response, 'Material', id)
    })

    test('returns material by id', async () => {
      const manufacturer = await createTestManufacturer()
      const material = await api.post('/api/materials', {
        name: 'Test Material',
        manufacturerId: manufacturer.id,
        unit: 'each',
      })
      const response = await api.get(`/api/materials/${material.body.id}`)
      expect(response.body.id).toBe(material.body.id)
    })
  })

  describe('POST /api/materials', () => {
    test('creates a new material', async () => {
      const manufacturer = await createTestManufacturer()
      const data = {
        name: 'New Material',
        manufacturerId: manufacturer.id,
        unit: 'each',
      }
      const response = await api.post('/api/materials', data)
      expect(response.body.name).toBe(data.name)
      info('Material created:', response.body)
      expect(response.body.manufacturerId).toBe(manufacturer.id)
    })

    test('returns 400 for invalid data', async () => {
      const manufacturer = await createTestManufacturer()
      const response = await api.post(
        '/api/materials',
        { name: null, manufacturerId: manufacturer.id, unit: 'each' },
        400,
      )
      expectValidationError(response, 'Material', ['Material name is required'])
    })

    test('returns 400 for non-existent manufacturer', async () => {
      const manufacturerId = 999
      const response = await api.post(
        '/api/materials',
        {
          name: 'Test Material',
          manufacturerId,
          unit: 'each',
        },
        400,
      )
      expectValidationError(response, 'Material', [
        `Manufacturer does not exist`,
      ])
    })
  })

  describe('POST /api/materials/bulk', () => {
    test('creates multiple materials', async () => {
      const manufacturer = await createTestManufacturer()
      const data = [
        { name: 'Material 1', manufacturerId: manufacturer.id, unit: 'each' },
        { name: 'Material 2', manufacturerId: manufacturer.id, unit: 'each' },
      ]
      const response = await api.post('/api/materials/bulk', data)
      expect(response.body).toHaveLength(2)
      expect(response.body[0].name).toBe(data[0].name)
      expect(response.body[1].name).toBe(data[1].name)
    })

    test('returns 400 for invalid data', async () => {
      const response = await api.post(
        '/api/materials/bulk',
        [{ name: null, manufacturerId: 1, unit: 'each' }],
        400,
      )
      expectValidationError(response, 'Material', [
        'Material name is required',
        'Manufacturer does not exist',
      ])
    })
  })

  describe('DELETE /api/materials/:id', () => {
    test('deletes existing material', async () => {
      const manufacturer = await createTestManufacturer()
      const material = await api.post('/api/materials', {
        name: 'Test Material',
        manufacturerId: manufacturer.id,
        unit: 'each',
      })
      await api.delete(`/api/materials/${material.body.id}`)
      const response = await api.get(`/api/materials/${material.body.id}`, 404)
      expectNotFoundError(response, 'Material', material.body.id)
    })

    test('returns 404 for non-existent material', async () => {
      const id = 999
      const response = await api.get(`/api/materials/${id}`, 404)
      expectNotFoundError(response, 'Material', id)
    })
  })
})
