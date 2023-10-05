/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    const tresMiliSegundos = 3000

    beforeEach(() => {
        cy.visit('./src/index.html') //Visitar alguma URL local ou externa
    })

    it('Deve verificar o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //Buscar título da aplicação e fazer um assert
    })

    it('Deve verificar se os campos obrigatórios estão preenchidos', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.clock()

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

        cy.tick(tresMiliSegundos)

        cy.get('.success')
            .should('not.be.visible')
    })

    it('Deve exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
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

        cy.tick(tresMiliSegundos)

        cy.get('.error')
            .should('not.be.visible')

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
            .check()

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
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(tresMiliSegundos)
        cy.get('.error')
            .should('not.be.visible')
    })

    it('Deve enviar o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(tresMiliSegundos)
        cy.get('.success').should('not.be.visible')
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

    it('Deve marcar o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Deve marcar cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Deve marcar ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('Deve selecionar um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload') //pegou o elemento
            .should('not.have.value')    //verificou que ainda não tinha valor 
            .selectFile('cypress/fixtures/example.json')  //upload de arquivo passando o caminho relativo do arquivo 
            .should(function ($input) { //should recebendo uma função de callback, e a função de callback recebendo o próprio elemento que foi passado no get
                expect($input[0].files[0].name).to.equal('example.json') //verificou se o arquivo do upload é igual ao que está mostrando

            })
    })

    it('Deve selecionar um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload') //pegou o elemento
            .should('not.have.value')    //verificou que ainda não tinha valor 
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })  //upload de arquivo passando o caminho relativo do arquivo 
            .should(function ($input) { //should recebendo uma função de callback, e a função de callback recebendo o próprio elemento que foi passado no get
                expect($input[0].files[0].name).to.equal('example.json') //verificou se o arquivo do upload é igual ao que está mostrando

            })
    })

    it('Deve selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('Deve verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('Deve acessar a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') // Remover o target para abrir a política de privacidade na mesma aba 
            .click()

        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('Deve exibir e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })


    it.only('Deve preencher a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('teste ', 20)

        cy.get('#open-text-area')
            .invoke('val', longText) //Invoca o valor dessa área de texto e seta na variávez longText
            .should('have.value', longText)
    })
})