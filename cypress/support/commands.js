Cypress.Commands.add('fillMandatoryFields', function() {
    cy.get('#firstName').type("Rodrigo");
    cy.get('#lastName').type("Toledo");
    cy.get('#email').type("mail@mail.com");
    cy.get('#phone').type("199999-9999");
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#open-text-area').type("campos de textos para escritas e comentários diversos e aleatórios", {delay:0});
    cy.contains('button', 'Enviar').click();
})
