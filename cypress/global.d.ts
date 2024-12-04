/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        loginToAAD(username: string, password: string): Chainable<any>
    }
}