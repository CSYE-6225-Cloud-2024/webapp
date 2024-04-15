import app from '../src'
import request from 'supertest'
import { users } from '../src/db/models/users.model'
import { db } from '../src/util/db'

describe('users', () => {
  afterAll(async () => {
    await users.drop()
  })

  describe('create user and get that user', () => {
    test('create user', async () => {
      const response = await request(app).post('/v5/user').send({
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe@example.com',
        password: 'password',
      })
      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe@example.com',
        account_created: expect.any(String),
        account_updated: expect.any(String),
      })
    })

    test('get user', async () => {
      const response = await request(app)
        .get('/v5/user/self')
        .set(
          'Authorization',
          `Basic ${Buffer.from('johndoe@example.com:password').toString(
            'base64'
          )}`
        )
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: expect.any(String),
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe@example.com',
        account_created: expect.any(String),
        account_updated: expect.any(String),
      })
    })
  })

  describe('update user and get with new password', () => {
    test('update user', async () => {
      const response = await request(app)
        .put('/v5/user/self')
        .set(
          'Authorization',
          `Basic ${Buffer.from('johndoe@example.com:password').toString(
            'base64'
          )}`
        )
        .send({
          password: 'password2',
        })
      expect(response.status).toBe(204)
      expect(response.body).toEqual({})
    })

    test('get user with new password', async () => {
      const response = await request(app)
        .get('/v5/user/self')
        .set(
          'Authorization',
          `Basic ${Buffer.from('johndoe@example.com:password2').toString(
            'base64'
          )}`
        )
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: expect.any(String),
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe@example.com',
        account_created: expect.any(String),
        account_updated: expect.any(String),
      })
    })
  })
})
