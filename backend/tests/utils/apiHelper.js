import supertest from 'supertest'
import app from '../../src/app'

const supertestApp = supertest(app)

export const get = async (endpoint, expectedStatus = 200, headers = {}) => {
  return await supertestApp
    .get(endpoint)
    .set(headers)
    .expect(expectedStatus)
    .expect('Content-Type', /application\/json/)
}

export const post = async (
  endpoint,
  data,
  expectedStatus = 201,
  headers = {},
) => {
  return await supertestApp
    .post(endpoint)
    .send(data)
    .set(headers)
    .expect(expectedStatus)
    .expect('Content-Type', /application\/json/)
}

export const put = async (
  endpoint,
  data,
  expectedStatus = 200,
  headers = {},
) => {
  return await supertestApp
    .put(endpoint)
    .send(data)
    .set(headers)
    .expect(expectedStatus)
    .expect('Content-Type', /application\/json/)
}

export const del = async (endpoint, expectedStatus = 204, headers = {}) => {
  return await supertestApp.delete(endpoint).set(headers).expect(expectedStatus)
}

const api = {
  get,
  post,
  put,
  delete: del,
}

export default api
