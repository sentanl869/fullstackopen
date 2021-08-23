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
      cy.contains('a blog created by cypress')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'http://test.by.cypress'
      })
      cy.contains('a blog created by cypress')
        .contains('view').click()
      cy.get('.blog-detail')
        .contains('like').click()
      cy.get('.blog-detail').contains('likes 1')
    })


    it('Blogs are automatically sorted by likes', function() {
      cy.createBlog({
        title: 'a blog created by cypress 1',
        author: 'cypress',
        url: 'http://test.by.cypress1',
        likes: 5
      })
      cy.createBlog({
        title: 'a blog created by cypress 2',
        author: 'cypress',
        url: 'http://test.by.cypress2',
        likes: 15
      })
      cy.createBlog({
        title: 'a blog created by cypress 3',
        author: 'cypress',
        url: 'http://test.by.cypress3',
        likes: 10
      })

      cy.contains('view').click()
      cy.get('.blog-detail')
        .contains('likes 15')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'http://test.by.cypress'
      })
      cy.contains('a blog created by cypress')
        .contains('view').click()
      cy.get('.blog-detail')
        .contains('remove').click()
      cy.get('.success')
        .should('contain', 'Delete blog a blog created by cypress by cypress success')
    })
  })
})