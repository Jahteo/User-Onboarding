describe("Form app", () => {

    describe("Inputs & submit button", () => {
        it("can navigate to http://localhost:3000/", () => {
            cy.visit("http://localhost:3000/")
            cy.url().should("include", "localhost")
        })

        it("can get name input and type a name in it", () => {
            cy.get("input[name='name']")
                .type("Auzzie Dog")
                .should("have.value", "Auzzie Dog")
        })

    })

})