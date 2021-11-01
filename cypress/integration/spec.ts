beforeEach(() =>{
  cy.visit('/home');
});

describe('Input validation test', () => {


  it('Should send a valid number and expect to render valid number confirmation', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.contains('This number is valid!').should('be.visible');
    cy.get('snack-bar-container').should('have.class','custom-snackbar-valid' );
  });

  it('Should send an invalid number and expect to render invalid number', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '345345345345');
    cy.contains('This number is invalid!').should('be.visible');
    cy.get('snack-bar-container').should('have.class','custom-snackbar-invalid' );
  });

  it('Should send same number two times and expect to render correct information message', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.contains('Number already validated, please check the table').should('be.visible');
  });

  it('Should send valid number and expect to clear the input after click', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.get('[formControlName="phoneNumber"]').should('have.value', '');
  });

  it('Should insert invalid numbers range and expect the correct helper message is render', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '123');
    cy.contains('Must have between 4 and 12 numbers.').should('be.visible');
    cy.get('[formControlName="phoneNumber"]').clear();
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '123456789012345');
    cy.contains('Must have between 4 and 12 numbers.').should('be.visible');
  });

  it('Should insert letters and expect the correct helper message is render', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', 'teste');
    cy.contains('Provide just numbers.').should('be.visible');
  });

  it('Should insert invalid inputs expect the button is disable', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', 'teste');
    cy.get("button").should('be.disabled');
    cy.get('[formControlName="phoneNumber"]').clear();
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '123');
    cy.get("button").should('be.disabled');
    cy.get('[formControlName="phoneNumber"]').clear();
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '123456789012345');
    cy.get("button").should('be.disabled');
  });
});


describe('Table of validated numbers test', () => {

  it('Should send valid number and expect the table is render', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.contains('Valid Phone Numbers').should('be.visible');

    cy.get('table').find('tr').as('rows');
    cy.get('@rows').first().then(() =>{
      cy.contains('Valid Number').should('be.visible');
      cy.contains('5545988391457').should('be.visible');
      cy.contains('Brazil').should('be.visible');
      cy.contains('CLARO SA').should('be.visible');
    });
  });

  it('Should send two numbers and expect both is render in table', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391455');

    cy.get('table').find('tr').should('have.length', 2);
  });

  it('Should clear table and expect it is not render', () => {
    cy.insertCountryAndNumberAndTryToValidate('Brazil', '45988391457');
    cy.contains('Clear table').click();

    cy.get('table').should('not.exist');
  });

});
