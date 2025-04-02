import { test, describe, expect } from 'vitest'
import { createTestManufacturer } from '../utils/testUtils'
import api from '../utils/apiHelper'
import {
  expectValidationError,
  expectNotFoundError,
} from '../utils/expectErrors'

describe('Manufacturers API', () => {
  describe('GET /api/manufacturers', () => {
    test('returns empty array when no manufacturers exist', async () => {
      const response = await api.get('/api/manufacturers')
      expect(response.body).toHaveLength(0)
    })

    test('returns all manufacturers', async () => {
      const manufacturer = await createTestManufacturer()
      const response = await api.get('/api/manufacturers')
      expect(response.body).toHaveLength(1)
      expect(response.body[0].id).toBe(manufacturer.id)
    })
  })

  describe('GET /api/manufacturers/:id', () => {
    test('returns 404 for non-existent manufacturer', async () => {
      const id = 999
      const response = await api.get(`/api/manufacturers/${id}`, 404)
      expectNotFoundError(response, 'Manufacturer', id)
    })

    test('returns manufacturer by id', async () => {
      const manufacturer = await createTestManufacturer()
      const response = await api.get(`/api/manufacturers/${manufacturer.id}`)
      expect(response.body.id).toBe(manufacturer.id)
    })
  })

  describe('POST /api/manufacturers', () => {
    test('creates a new manufacturer', async () => {
      const data = { name: 'New Manufacturer' }
      const response = await api.post('/api/manufacturers', data)
      expect(response.body.name).toBe(data.name)
    })

    test('returns 400 for invalid data', async () => {
      const response = await api.post('/api/manufacturers', { name: null }, 400)
      expectValidationError(response, 'Manufacturer', [
        'Manufacturer name is required',
      ])
    })
  })

  describe('PUT /api/manufacturers/:id', () => {
    test('updates existing manufacturer', async () => {
      const manufacturer = await createTestManufacturer()
      const data = { ...manufacturer, name: 'Updated Manufacturer' }
      const response = await api.put(
        `/api/manufacturers/${manufacturer.id}`,
        data,
      )
      expect(response.body.name).toBe(data.name)
    })

    test('returns 404 for non-existent manufacturer', async () => {
      const id = 999
      const response = await api.get(`/api/manufacturers/${id}`, 404)
      expectNotFoundError(response, 'Manufacturer', id)
    })

    test('returns 400 for invalid data', async () => {
      const manufacturer = await createTestManufacturer()
      const response = await api.put(
        `/api/manufacturers/${manufacturer.id}`,
        { name: null },
        400,
      )
      expectValidationError(response, 'Manufacturer', [
        'Manufacturer name is required',
      ])
    })
  })

  describe('DELETE /api/manufacturers/:id', () => {
    test('deletes existing manufacturer', async () => {
      const manufacturer = await createTestManufacturer()
      await api.delete(`/api/manufacturers/${manufacturer.id}`)
      const response = await api.get(
        `/api/manufacturers/${manufacturer.id}`,
        404,
      )
      expectNotFoundError(response, 'Manufacturer', manufacturer.id)
    })

    test('returns 404 for non-existent manufacturer', async () => {
      const id = 999
      const response = await api.delete(`/api/manufacturers/${id}`, 404)
      expectNotFoundError(response, 'Manufacturer', id)
    })
  })
})
