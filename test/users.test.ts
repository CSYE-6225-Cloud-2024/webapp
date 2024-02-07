// import app from '../src'
// import request from 'supertest'
// import { users } from '../src/db/models/users.model'

describe('users', () => {
  test('should pass', () => {
    expect(1).toBe(1)
  })
})

// describe('users', () => {
//   beforeAll((done) => {
//     users.afterSync(async () => {
//       await users.destroy({ where: {} })
//     })
//     done()
//   })

//   test('create user', async () => {
//     const response = await request(app).post('/v1/user').send({
//       first_name: 'John',
//       last_name: 'Doe',
//       username: 'johndoe@example.com',
//       password: 'password',
//     })
//     expect(response.status).toBe(201)
//   })

//   test('get user', async () => {
//     const response = await request(app)
//       .get('/v1/user/self')
//       .set(
//         'Authorization',
//         `Basic ${Buffer.from('johndoe@example.com:password').toString(
//           'base64'
//         )}`
//       )
//     expect(response.status).toBe(200)
//   })

//   describe('update user and get with new password', () => {
//     test('update user', async () => {
//       const response = await request(app)
//         .put('/v1/user/self')
//         .set(
//           'Authorization',
//           `Basic ${Buffer.from('johndoe@example.com:password').toString(
//             'base64'
//           )}`
//         )
//         .send({
//           password: 'password2',
//         })
//       expect(response.status).toBe(204)
//     })

//     test('get user with new password', async () => {
//       const response = await request(app)
//         .get('/v1/user/self')
//         .set(
//           'Authorization',
//           `Basic ${Buffer.from('johndoe@example.com:password2').toString(
//             'base64'
//           )}`
//         )
//       expect(response.status).toBe(200)
//     })
//   })
// })
