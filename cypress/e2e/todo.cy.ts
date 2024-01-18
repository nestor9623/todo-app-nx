describe('App Component Form Test', () => {
  beforeEach(() => {
  });
  
  it('Obtiene el valor del input y lo inserta', () => {
    // Get an input, type into it
    cy.visit('/'); // Adjust URL if your app is served at a different path
    cy.get('.form-control').type("Prueba");
    cy.get('.add').click();
  })

  it('Valida que no puede ingresar un valor vacio', () => {
    // Get an input, type into it
    cy.visit('/'); // Adjust URL if your app is served at a different path
    cy.get('.form-control').focus().blur();
    cy.get('.add').click();
    cy.get('.invalid-feedback > div').should("exist").contains("textToSearch is required");
  })
});
