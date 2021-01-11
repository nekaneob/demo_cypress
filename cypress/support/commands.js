Cypress.Commands.add('obtenerTextoAlt', (selector) => {

  cy.get(selector).find("img").then(elem => {
    let texto=elem.attr("alt").slice(20)
    cy.log("texto guardado",  texto)
  })

})