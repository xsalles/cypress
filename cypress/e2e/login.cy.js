const url = 'http://localhost:3000'

describe('Testando o Login', () => {
  it('Logar com sucesso', () => {
    cy.visit(url)

    cy.get('#email').type('4dt@gmail.com')
    cy.get('#password').type('4DT')

    cy.get('button[type="submit"]').click()
  })

  it('Tentar logar com um email inválido', () => {
    cy.visit(url)

    cy.get('#email').type('4dt')
    cy.get('#password').type('4DT')

    cy.get('button[type="submit"]').click()

    cy.contains('p', 'Hmm... esse email parece estar errado 🤔')
  })

  it('Tentar logar com uma senha inválida', () => {
    cy.visit(url)

    cy.get('#email').type('4dt@gmail.com')
    cy.get('#password').type('123')

    cy.get('button[type="submit"]').click()

    cy.contains('.title', 'Acesso negado! Tente novamente')
  })

  it('Tentar logar com os campos em branco', () => {
    cy.visit(url)

    cy.get('button[type="submit"]').click()

    cy.contains('p', 'Ei, não esqueça de digitar seu email!')
    cy.contains('p', 'Você precisa de uma senha para entrar! 🔒')
  })
})