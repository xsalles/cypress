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

describe('Testando o cadastro', () => {
  it('Cadastrar com sucesso', () => {
    cy.visit(`${url}/register`)

    cy.get('#name').type('Senaí Cypress Fiama')
    cy.get('#email').type('senaicypressfiama@gmail.com')
    cy.get('#password').type('senaicypress')

    cy.get('button[type="submit"]').click()
  })

  it('Tentar cadastrar com um email já cadastrado', () => {
    cy.visit(`${url}/register`)

    cy.get('#name').type('Senaí Cypress Fiama')
    cy.get('#email').type('4dt@gmail.com')
    cy.get('#password').type('senaicypress')

    cy.get('button[type="submit"]').click()

    cy.contains('.title', 'Erro ao criar conta')
  })

  it('Tentar cadastrar com uma senha fraca', () => {
    cy.visit(`${url}/register`)

    cy.get('#name').type('Senaí Cypress Fiama')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#password').type('teste')

    cy.get('button[type="submit"]').click()

    cy.contains('p', 'Essa senha está meio fraquinha... que tal uma com pelo menos 6 caracteres? 💪')
  })
})

describe('Testando o formulário de adicionar perfil do GitHub', () => {
  it('Adicionar perfil do GitHub com sucesso', () => {
    cy.visit(`${url}`)

    cy.get('#email').type('4dt@gmail.com')
    cy.get('#password').type('4DT')

    cy.get('button[type="submit"]').click()

    cy.visit(`${url}/github`)

    cy.get('#name').type('Pedro')
    cy.get('#username').type('xsalles')
    cy.get('#profile').type('Dev Front-End')

    cy.get('button[type="submit"]').click()
    
    cy.contains('tr', 'Pedro')
    cy.contains('tr', 'xsalles')
    cy.contains('tr', 'Dev Front-End')
  })

  it('Tentar remover perfil', () => {
    cy.visit(`${url}`)

    cy.get('#email').type('4dt@gmail.com')
    cy.get('#password').type('4DT')

    cy.get('button[type="submit"]').click()

    cy.visit(`${url}/github`)

    cy.get('#name').type('Pedro')
    cy.get('#username').type('xsalles')
    cy.get('#profile').type('Dev Front-End')

    cy.get('button[type="submit"]').click()

    cy.get('.lucide.lucide-trash2').click()
    
    cy.get('tr').should('not.contain', 'Pedro')
    cy.get('tr').should('not.contain', 'xsalles')
    cy.get('tr').should('not.contain', 'Dev Front-End')
  })
})