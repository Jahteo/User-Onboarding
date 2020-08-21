describe("Form app", () => {

    describe("Inputs & submit button", () => {
        it("can navigate to http://localhost:3000/", () => {
            cy.visit("http://localhost:3000/")
            cy.url().should("include", "localhost")
        })

        it("submit button is disabled before input", () => {
            cy.get("[data-cy='submit']")
                .should("be.disabled")
        })

        it("can get name input and type a name in it", () => {
            cy.get("input[name='name']")
                .type("Auzzie Dog")
                .should("have.value", "Auzzie Dog")
        })

        it("can get email input and type a email in it", () => {
            cy.get("input[name='email']")
                .type("Dogsrule@woof.com")
                .should("have.value", "Dogsrule@woof.com")
        })

        it("can get password input and type a password in it", () => {
            cy.get("input[name='password']")
                .type("masterpupper")
                .should("have.value", "masterpupper")
        })

        it("can check terms of service box", () => {
            cy.get("input[name='terms']").check()
                .should("be.checked")
        })

        it("can choose a role", () => {
            cy.get("select[name='role']")
            .should('have.value', 'init')
            .select("dev")
            .should("have.value", "dev")
        })

        it("can click sumbit button", () => {
            cy.get("[data-cy='submit']")
            .should("not.be.disabled")
            .click()
        })

    })

    describe("testing validation", () => {
        it("can navigate to http://localhost:3000/", () => {
            cy.visit("http://localhost:3000/")
            cy.url().should("include", "localhost")
        })
        it("can check email validation", () => {
            cy.get("input[name='email']")
                .type("Dogsrulecom")
            cy.contains("Real email addresses only please")
        })

    })
})