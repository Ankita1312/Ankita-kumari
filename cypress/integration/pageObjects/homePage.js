//declare a class name
class homePage {
    // we will create method so that it can be called anywhere
    getEmail() {
        return cy.get('#email')
    }
    getpassword() {
        return cy.get('#password')
    }
    getSignin() {
        return cy.get('.btn')
    }



}

export default homePage;