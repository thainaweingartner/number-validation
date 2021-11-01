declare namespace Cypress {

  interface Chainable<Subject = any> {
    insertCountryAndNumberAndTryToValidate(country: string, phoneNumber: string): typeof insertCountryAndNumberAndTryToValidate;
  }
}

function insertCountryAndNumberAndTryToValidate(country: string, phoneNumber: string): void {
  cy.get('[formControlName="countryNumber"]').click();
  cy.contains(country).click();
  cy.get('[formControlName="phoneNumber"]').type(phoneNumber);
  cy.get("button").contains('Validate').click();
}

Cypress.Commands.add('insertCountryAndNumberAndTryToValidate', insertCountryAndNumberAndTryToValidate);
