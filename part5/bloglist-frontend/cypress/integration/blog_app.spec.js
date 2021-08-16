describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'sentanl869',
      username: 'sentanl869',
      password: 'fullstackopen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('log in to application')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.contains('log in').click()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sentanl869')
      cy.get('#password').type('fullstackopen')
      cy.get('#login-button').click()

      cy.contains('sentanl869 logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sentanl869')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sentanl869', password: 'fullstackopen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://test.by.cypress')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress cypress')
    })
  })
})