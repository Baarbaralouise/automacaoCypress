/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html') //Visitar alguma URL local ou externa
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //Buscar título da aplicação e fazer um assert
    })

    it('Verifica se os campos obrigatórios estão preenchidos', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName')
            .should('be.visible')
            .type('Bárbara')
            .should('have.value', 'Bárbara')

        cy.get('#lastName')
            .type('Fonseca Alves')
            .should('have.value', 'Fonseca Alves')

        cy.get('#email')
            .type('barbaralouise@teste.com')
            .should('have.value', 'barbaralouise@teste.com')

        cy.get('#open-text-area')
            .type(longText, { delay: 0 }) // Sobrescrever o delay com o tempo mínimo

        cy.contains('button', 'Enviar').click()

        cy.get('.success')
            .should('be.visible')
    })

    it('Deve exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Bárbara')
            .should('have.value', 'Bárbara')

        cy.get('#lastName')
            .type('Fonseca Alves')
            .should('have.value', 'Fonseca Alves')

        cy.get('#email')
            .type('barbaralouise@teste,com')
            .should('have.value', 'barbaralouise@teste,com')

        cy.get('#open-text-area')
            .type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error')
            .should('be.visible')
    })

    it('Campo de telefone fica vazio ao preencher com valor não-numérico', function () {

        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Deve exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Bárbara')
            .should('have.value', 'Bárbara')

        cy.get('#lastName')
            .type('Fonseca Alves')
            .should('have.value', 'Fonseca Alves')

        cy.get('#email')
            .type('barbaralouise@teste.com')
            .should('have.value', 'barbaralouise@teste.com')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#open-text-area')
            .type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error')
            .should('be.visible')
    })

    it('Deve preencher e limpar os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Barbara')
            .should('have.value', 'Barbara')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Alves')
            .should('have.value', 'Alves')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')


        cy.get('#phone')
            .type('11999999999')
            .should('have.value', '11999999999')
            .clear()
            .should('have.value', '')
    })

    it('Deve exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error')
            .should('be.visible')
    })

    it('Deve enviar o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Deve selecionar um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    
    it('Deve selecionar um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    
    it('Deve selecionar um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1)
        .should('have.value', 'blog')

    })

})