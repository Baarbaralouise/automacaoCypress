// ADICONAR UM NOVO COMANDO AO CYPRESS
// Primeiro argumento é o nome do comando customizado e o segundo argumento é uma função que vai executar o comando
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Bárbara')
    cy.get('#lastName').type('Fonseca Alves')
    cy.get('#email').type('barbaralouise@teste.com')
    cy.get('#open-text-area').type('Teste') 
    cy.contains('button', 'Enviar').click()
}) 