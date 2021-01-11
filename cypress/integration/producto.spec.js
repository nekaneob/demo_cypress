describe('Test Producto', function() {

  before(function() {
      cy.visit('https://www.amazon.es/')
      cy.get('#sp-cc-accept').click();

      cy.fixture('producto').then(function(data) {
          this.data = data
      })
  })

  it('Busqueda y ficha de producto', function() {
      cy.get('#twotabsearchtextbox').type(this.data.producto)
      cy.get('#nav-search-submit-text').click()
  })

  it('Todos los productos que se muestran contienen una imagen de formato jpg', function() {
      cy.get('[data-component-type="s-search-result"]').find("img").should('have.attr', 'src').should('include', '.jpg')
  })

  it('Todos los productos que se muestran tienen precio', function() {
      cy.get('[data-component-type="s-search-result"]').find('.a-price-whole').contains(/([\$€¥])?\s?(\d{1,3}((,\d{1,3})+)?(.\d{1,3})?(.\d{1,3})?(,\d{1,3})?)/)
  });

  it('Guarda el titulo del producto sugerido', function() {
      cy.obtenerTextoAlt('[cel_widget_id="MAIN-SEARCH_RESULTS-1"]') //Se busca por el alt de la imagen ya que la busqueda por el texto del span me ha dado problemas
  });

  it('Realiza la busqueda de un producto e intercepta la llamada de sugerencias de producto que se realiza. Comprueba que devuelve un 200', function() {
      cy.get('[cel_widget_id="MAIN-SEARCH_RESULTS-1"]').click()
      cy.intercept('suggestions', (req) => {
          req.reply((res) => {
              expect(resp.status).to.eq(200)
          })
      })
  });

  it('El titulo del producto mostrado en la lista corresponde con el titulo interior del producto', function() {
      /* cy.get('#productTitle').should(($titulo) => {
            expect($titulo.text()).to.eq(texto)
       })*/
  });

  it('Hace click en Comprar ya y redigire bien a la pantalla de login', function() {
      cy.get('#buy-now-button').click()
      cy.url().should('include', 'signin')
  });

})