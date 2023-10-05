Cypress._.times(5, function() {
    it.only('Deve testar a página da política de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html') 
    
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})