
describe('collab suite test', () => {
    it('logins in', () => {
        cy.visit('http://localhost:3000')
        cy.get('.login-btn')
          .click()
        cy.get('#firstLoginInput')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
        cy.get('#secondLoginInput')
          .type('test')
          .should('have.value', 'test')
        cy.get('.login-modal-btn')
          .click()
    })

    it('creates a room', () => {
        cy.visit('http://localhost:3000')
        cy.get('.login-btn')
          .click()
        cy.get('#firstLoginInput')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
        cy.get('#secondLoginInput')
          .type('test')
          .should('have.value', 'test')
        cy.get('.login-modal-btn')
          .click()
        cy.get('#createRoomBtnNav')
          .click()
    })
    it('can log out', () => {
        cy.visit('http://localhost:3000')
        cy.get('.login-btn')
          .click()
        cy.get('#firstLoginInput')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
        cy.get('#secondLoginInput')
          .type('test')
          .should('have.value', 'test')
        cy.get('.login-modal-btn')
          .click()
        cy.get('#logoutButtonNav')
          .click()
    })
    it('can send a message', () => {
        cy.visit('http://localhost:3000')
        cy.get('.login-btn')
          .click()
        cy.get('#firstLoginInput')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
        cy.get('#secondLoginInput')
          .type('test')
          .should('have.value', 'test')
        cy.get('.login-modal-btn')
          .click()
        cy.get('#createRoomBtnNav')
          .click()
        cy.get('.msg-input')
          .type('testing hello world')
          .should('have.value', 'testing hello world')
        cy.get('.msg-btn')
          .click()
    })
    it('can leave a room', () => {
        cy.visit('http://localhost:3000')
        cy.get('.login-btn')
          .click()
        cy.get('#firstLoginInput')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
        cy.get('#secondLoginInput')
          .type('test')
          .should('have.value', 'test')
        cy.get('.login-modal-btn')
          .click()
        cy.get('#createRoomBtnNav')
          .click()
        cy.get('.msg-input')
          .type('testing hello world')
          .should('have.value', 'testing hello world')
        cy.get('.msg-btn')
          .click()
        cy.get('#endRoomBtnChat')
          .click()
    })
})