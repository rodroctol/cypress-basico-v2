/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', function(){
    beforeEach(function() {
        cy.visit('src/index.html');
    })

    it("verifica o titulo da aplicação", () => {
        cy.title().should('be.eq', "Central de Atendimento ao Cliente TAT");
    })

    it("Preenche todos os campos de texto", () => {
        cy.get('#firstName').type("Rodrigo");
        cy.get('#lastName').type("Toledo");
        cy.get('#email').type("mail@mail.com");
        cy.get('#phone').type("199999-9999");
        cy.get('#product').select('Cursos');
        cy.get('#open-text-area').type("campos de textos para escritas e comentários", {delay:0});
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');
    })

    it("Validar mensagem de erro para argumento inválido em email", () => {
        cy.get('#firstName').type("Rodrigo");
        cy.get('#lastName').type("Toledo");
        cy.get('#email').type("mail@mail,com");
        cy.get('#phone').type("199999-9999");
        cy.get('#open-text-area').type("campos de textos para escritas e comentários", {delay:0});
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it("Validar campo numérico de telefone com string", () => {
        cy.get('#phone')
            .type("alkjhflsda")
            .should('have.value', '')
    })

    it("verificar mensagem de erro para telefone obrigatório em branco", () => {
        cy.get('#firstName').type("Rodrigo");
        cy.get('#lastName').type("Toledo");
        cy.get('#email').type("mail@mail.com");
        cy.get('#phone-checkbox').click();
        cy.get('#phone').type("199999999").clear();
        cy.get('#open-text-area').type("campos de textos para escritas e comentários", {delay:0});
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it("visitar a pagina e clicar no botão enviar", () => {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it("Usando comando customizado para o formulário", () => {
        cy.fillMandatoryFields();
        cy.get('.success').should('be.visible');
    })

    it("Selecione um produto (Blog) por seu indice", () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it("usando seletor radio button", () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback');
    })

    it("testando todos os radios button", () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            }
        )
    })

    it("Desmarcando um radio usando o uncheck", () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
            }
        )
    })

    it("interagindo com check-box", () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('fazendo upload de arquivo', () => {
        cy.fillMandatoryFields();
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/receitas-bar.pdf')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('receitas-bar.pdf')
            })
    })

    it("drag-and-drop file test", () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/receitas-bar.pdf', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('receitas-bar.pdf')
            })
    })

    it("utilizando um Alias em fixtures", () => {
        cy.fixture('receitas-bar.pdf').as('receita');
        cy.get('input[type="file"]')
        .selectFile('@receita')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('receitas-bar.pdf')
        })
    })

    it("Verificando um link que abre uma segunda aba", () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it("Removendo uma chamada de nova aba", () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
})