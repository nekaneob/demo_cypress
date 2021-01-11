describe('Test Home', function(){

  before(function(){
    cy.visit('https://www.amazon.es/')
  })
  

  it('Accede a amazon', function(){
    cy.url().should('include', 'amazon.es');
  })


  it('La barra de cookies se muestra y se oculta al aceptarlas', function(){
    cy.clearCookies();
    cy.get('#sp-cc-accept').click();
  })


  it('La imagen del banner se muestra y contiene un .jpg', function(){     
    cy.get('#anonCarousel1').find("img").should('be.visible');
    cy.get('#anonCarousel1').find("img").should('have.attr', 'src').should('include','.jpg');
  })


  it('El menu Todo se muestra y oscurece el fondo', function(){
    cy.get('#nav-hamburger-menu').should('be.visible');
    cy.get('#nav-hamburger-menu').click();
    cy.get('#a-page').should('have.attr', 'aria-hidden').should('include', 'true');
    cy.get('.hmenu-close-icon').click();

  })


  it('El footer tiene 4 columnas', function(){
      cy.get('.navFooterLinkCol').should('have.length', 4);
  })
 
})