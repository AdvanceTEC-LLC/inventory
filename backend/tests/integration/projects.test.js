import { describe, it, expect } from 'vitest'
import api from '../utils/apiHelper.js'
import { createTestProject } from '../utils/testUtils.js'
import {
  expectMissingRequiredError,
  expectNotFoundError,
  expectValidationError,
} from '../utils/expectErrors.js'

describe('projects API', () => {
  describe('GET /api/projects', () => {
    test('returns empty array when no projects exist', async () => {
      const response = await api.get('/api/projects')
      expect(response.body).toEqual([])
    })

    test('returns all projects', async () => {
      const project = await createTestProject()
      const response = await api.get('/api/projects')
      expect(response.body).toHaveLength(1)
      expect(response.body[0].id).toBe(project.id)
    })
  })

  describe('GET /api/projects/:id', () => {
    test('returns 404 for non-existent project', async () => {
      const id = 999
      const response = await api.get(`/api/projects/${id}`, 404)
      expectNotFoundError(response, 'Project', id)
    })

    test('returns project by id', async () => {
      const project = await createTestProject()
      const response = await api.get(`/api/projects/${project.id}`)
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(project.id)
    })
  })

  describe('POST /api/projects', () => {
    test('returns 400 for invalid data', async () => {
      const response = await api.post(
        '/api/projects',
        {
          number: 1000,
          name: null,
        },
        400,
      )
      expectMissingRequiredError(response, 'Project', 'name')
    })

    test('creates new project', async () => {
      const projectData = { number: 1000, name: 'Test Project' }
      const response = await api.post('/api/projects', projectData)
      expect(response.status).toBe(201)
      expect(response.body.name).toBe(projectData.name)
    })
  })

  describe('PUT /api/projects/:id', () => {
    test('returns 404 for non-existent project', async () => {
      const id = 999
      const response = await api.put(
        `/api/projects/${id}`,
        {
          name: 'Updated Project',
          number: 1000,
        },
        404,
      )
      expectNotFoundError(response, 'Project', id)
    })

    test('updates project', async () => {
      const project = await createTestProject()
      const updateData = { name: 'Updated Project', number: 2000 }
      const response = await api.put(`/api/projects/${project.id}`, updateData)
      expect(response.status).toBe(200)
      expect(response.body.name).toBe(updateData.name)
    })
  })

  describe('DELETE /api/projects/:id', () => {
    test('returns 404 for non-existent project', async () => {
      const id = 999
      const response = await api.delete(`/api/projects/${id}`, 404)
      expectNotFoundError(response, 'Project', id)
    })

    test('deletes project', async () => {
      const project = await createTestProject()
      const response = await api.delete(`/api/projects/${project.id}`)
      expect(response.status).toBe(204)
    })
  })
})
