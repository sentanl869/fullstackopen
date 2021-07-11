const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = await Promise.all(
    helper.initialUsers.map(async user => {
      const passwordHash = await bcrypt.hash('fullstackopen', 10)
      user.passwordHash = passwordHash
      return new User(user)
    })
  )
  const promiseArray = userObject.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('returned of users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('addition of new user', () => {
  test('a user can be add', async () => {
    const newUser = {
      username: 'useraddtest',
      name: 'uat',
      password: 'fullstackopen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const username = usersAtEnd.map(user => user.username)
    expect(username).toContain('useraddtest')
  })

  test('add user with same username', async () => {
    const newUser = {
      username: 'testuser_1',
      name: 'testuser_1_name',
      password: 'fullstackopen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
  })

  test('add user with unvalid password', async () => {
    const newUser_1 = {
      username: 'emptyPassword',
      name: 'ePwd',
      password: ''
    }
    const newUser_2 = {
      username: 'twoLengthPassword',
      name: 'wLP',
      password: 'aa'
    }
    const newUser_3 = {
      username: 'withoutPassword',
      name: 'wPwd',
    }

    await api
      .post('/api/users')
      .send(newUser_1)
      .expect(401)

    await api
      .post('/api/users')
      .send(newUser_2)
      .expect(401)

    await api
      .post('/api/users')
      .send(newUser_3)
      .expect(401)

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})