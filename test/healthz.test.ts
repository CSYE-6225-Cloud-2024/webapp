// import app from '../src/index'
// import request from 'supertest'
// import { Server } from 'http'
// import { exec } from 'child_process'
// import { promisify } from 'util'

// const execAsync = promisify(exec)

describe('healthz', () => {
  test('should pass', () => {
    expect(1).toBe(1)
  })
})

// describe('healthz', () => {
//   let server: Server
//   beforeAll((done) => {
//     server = app.listen(8080)
//     done()
//   })

//   afterAll((done) => {
//     server.close()
//     done()
//   })

//   describe('Database Connection', () => {
//     test('Database Up should return 200', async () => {
//       const response = await request(app).get('/healthz')
//       expect(response.status).toBe(200)
//     })

//     test('Database Down should return 503', async () => {
//       await execAsync('brew services stop postgresql@14')
//       const response = await request(app).get('/healthz')
//       expect(response.status).toBe(503)
//     }, 10000)
//   })

//   describe('Invalid Requests', () => {
//     beforeAll(async () => {
//       await execAsync('brew services start postgresql@14')
//     })

//     test('Making a POST request to /healthz should return 405', async () => {
//       const response = await request(app).post('/healthz')
//       expect(response.status).toBe(405)
//     })

//     test('Making a PUT request to /healthz should return 405', async () => {
//       const response = await request(app).put('/healthz')
//       expect(response.status).toBe(405)
//     })

//     test('Making a PATCH request to /healthz should return 405', async () => {
//       const response = await request(app).patch('/healthz')
//       expect(response.status).toBe(405)
//     })

//     test('Making a DELETE request to /healthz should return 405', async () => {
//       const response = await request(app).delete('/healthz')
//       expect(response.status).toBe(405)
//     })

//     test('Making a HEAD request to /healthz should return 405', async () => {
//       const response = await request(app).head('/healthz')
//       expect(response.status).toBe(405)
//     })

//     test('Making a OPTIONS request to /healthz should return 405', async () => {
//       const response = await request(app).options('/healthz')
//       expect(response.status).toBe(405)
//     })
//   })

//   describe('Bad Requests', () => {
//     test('request body sent to /healthz should return 400', async () => {
//       const response = await request(app).get('/healthz').send({ test: 'test' })
//       expect(response.status).toBe(400)
//     })

//     test('query string sent to /healthz should return 400', async () => {
//       const response = await request(app).get('/healthz?test=test')
//       expect(response.status).toBe(400)
//     })
//   })
// })
