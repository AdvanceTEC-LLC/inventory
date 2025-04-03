import { test, describe, expect } from 'vitest'
import {
  createTestStock,
  createTestMaterial,
  createTestProject,
} from '../utils/testUtils'
import api from '../utils/apiHelper'
import {
  expectValidationError,
  expectNotFoundError,
} from '../utils/expectErrors'

describe('Stock API', () => {
  describe('GET /api/stock', () => {
    test('returns empty array when no stock items exist', async () => {
      const response = await api.get('/api/stock')
      expect(response.body).toHaveLength(0)
    })

    test('returns all stock items', async () => {
      const stock = await createTestStock()
      const response = await api.get('/api/stock')
      expect(response.body).toHaveLength(1)
      expect(response.body[0].id).toBe(stock.id)
    })
  })

  describe('GET /api/stock/:id', () => {
    test('returns 404 for non-existent stock item', async () => {
      const id = 999
      const response = await api.get(`/api/stock/${id}`, 404)
      expectNotFoundError(response, 'Stock', id)
    })

    test('returns stock item by id', async () => {
      const stock = await createTestStock()
      const response = await api.get(`/api/stock/${stock.id}`)
      expect(response.body.id).toBe(stock.id)
    })
  })

  describe('POST /api/stock', () => {
    test('creates a new stock item', async () => {
      const material = await createTestMaterial()
      const project = await createTestProject()
      const data = {
        materialId: material.id,
        projectId: project.id,
        quantity: 100,
      }

      const response = await api.post('/api/stock', data)
      expect(response.body.quantity).toBe(data.quantity)
      expect(response.body.materialId).toBe(material.id)
      expect(response.body.projectId).toBe(project.id)
    })

    test('returns 400 for invalid data', async () => {
      const response = await api.post('/api/stock', { quantity: -10 }, 400)
      expectValidationError(response, 'Stock', [
        'Stock materialId is required',
        'Stock projectId is required',
        'Stock quantity must be positive',
      ])
    })
  })

  describe('PUT /api/stock/:id', () => {
    test('updates existing stock item', async () => {
      const stock = await createTestStock()
      const data = {
        id: stock.id,
        materialId: stock.materialId,
        projectId: stock.projectId,
        quantity: 200,
      }
      const response = await api.put(`/api/stock/${stock.id}`, data)
      expect(response.body.quantity).toBe(data.quantity)
    })

    test('returns 404 for non-existent stock item', async () => {
      const id = 999
      const response = await api.put(`/api/stock/${id}`, { quantity: 50 }, 404)
      expectNotFoundError(response, 'Stock', id)
    })

    test('returns 400 for invalid data', async () => {
      const stock = await createTestStock()
      const response = await api.put(
        `/api/stock/${stock.id}`,
        { materialId: null },
        400,
      )
      expectValidationError(response, 'Stock', [
        'Stock materialId is required',
        'Stock projectId is required',
        'Stock quantity is required',
      ])
    })

    test('removes stock for non-positive quantity', async () => {
      const stock = await createTestStock()
      await api.put(`/api/stock/${stock.id}`, { quantity: 0 })
      const response = await api.get(`/api/stock/${stock.id}`, 404)
      expectNotFoundError(response, 'Stock', stock.id)
    })
  })

  describe('DELETE /api/stock/:id', () => {
    test('deletes existing stock item', async () => {
      const stock = await createTestStock()
      await api.delete(`/api/stock/${stock.id}`)
      const response = await api.get(`/api/stock/${stock.id}`, 404)
      expectNotFoundError(response, 'Stock', stock.id)
    })

    test('returns 404 for non-existent stock item', async () => {
      const id = 999
      const response = await api.delete(`/api/stock/${id}`, 404)
      expectNotFoundError(response, 'Stock', id)
    })
  })
})
