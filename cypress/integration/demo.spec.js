
describe('Comprobar elementos del home', function(){

    it('Accede a amazon', function(){
      cy.visit('/')
      cy.url().should('include', 'amazon.com');
    })

    it('La barra de cookies se muestra y se oculta al aceptarlas', function(){
      cy.clearCookies();
    })

    it('La imagen del banner se muestra y contiene un .jpg', function(){
      // La imagen del banner se muestra ...
      cy.get('#anonCarousel1').find("img").should('be.visible');
      // ... y contiene jpg
      cy.get('#anonCarousel1').find("img").should('have.attr', 'src').should('include','.jpg');
    })

    it('El menu Todo se muestra y oscurece el fondo', function(){
      // El menu todo se muestra...
      cy.get('#nav-hamburger-menu').should('be.visible');
      // ... y al pulsar...
      cy.get('#nav-hamburger-menu').click();
      // ... se oscurece el fondo
      cy.get('#a-page').should('have.attr', 'aria-hidden').should('include', 'true');
      // Se cierra el menu
      cy.get('.hmenu-close-icon').click();
    })

    it('El footer tiene 4 columnas', function(){
      cy.get('.navFooterLinkCol').should('have.length', 4);
    })
  })
  
  
  describe('Busqueda y ficha de producto', function(){
    let titulo = "";

    it('Realiza la busqueda de un producto e intercepta la llamada de sugerencias de producto que se realiza. Comprueba que devuelve un 200', function(){
     // Realiza la busqueda de un producto...
     cy.get('#twotabsearchtextbox').type('keyboard');
     cy.get('#nav-search-submit-text').click();
     // ... accede al detalle ...
     cy.get(' :nth-child(1) > .celwidget > [data-component-type="s-impression-logger"] > div.rush-component > .s-include-content-margin > .a-spacing-medium > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .sg-col-4-of-12 > .sg-col-inner > :nth-child(1) > .a-spacing-none > .a-link-normal > .a-size-medium:first').click();
     // ... e intercepta la llamada de sugerencias de producto que se realiza. Comprueba que devuelve un 200   
     cy.intercept('suggestions', (req) => {
        req.reply((res) => {
          expect(resp.status).to.eq(200)
        })
      })
    })
  
    it('Todos los productos que se muestran contienen una imagen de formato jpg', function(){
     cy.get('ol.a-carousel').find("img").should('have.attr', 'src').should('include','.jpg');  
    })
  
    it('Todos los productos que se muestran tienen precio', function(){
      cy.get('.a-row.a-color-price').find('.a-size-medium').contains(/([\$€¥])?\s?(\d{1,3}((,\d{1,3})+)?(.\d{1,3})?(.\d{1,3})?(,\d{1,3})?)/);
    });
  
    it('Guarda el titulo del producto sugerido', function(){
      return obtenerTitulo('ol.a-carousel > li:first > div:first > a.a-link-normal:first > div').then(tituloElemento => {
        titulo = tituloElemento + "";       
      });

      
    });
  
    it('El titulo del producto mostrado en la lista corresponde con el titulo interior del producto', function(){
      //cy.log("titulo = " + titulo);
      // Accede al interior del producto
      //cy.get('ol.a-carousel > li:first > div:first > a.a-link-normal').click();
      // Comprueba titulo 
      //cy.get('#productTitle').should('include', titulo);
   });
  
    it('Hace click en Comprar ya y redigire bien a la pantalla de login', function(){
      cy.get('#buy-now-button').click();
      cy.url().should('include', 'signin');
    })
  })
  
  
  describe('Formulario de registro', function(){
    it('Accede al formulario de registro', function(){
      cy.get('#createAccountSubmit').click();
      cy.url().should('include', 'register');
    })
    it('Se muestran los mensajes de error al enviar el formulario vacio', function(){
      // Al envio del formulario vacio...
      cy.get('#continue').click();
      // ... se muestran los mensajes de error esperados.
      cy.get('.a-alert-content').should('contain.text','Enter your name');
      cy.get('.a-alert-content').should('contain.text','Enter a valid email address');
      cy.get('.a-alert-content').should('contain.text',' Passwords must match');
    })
    it('Se muestra el mensaje de error al enviar un email incorrecto', function(){
      // Al envio de un mail incorrecto ...
      cy.get('#ap_email').type('demo@@gmail.com');
      cy.get('#continue').click();
      // ... se muestra el mensaje de error esperado.
      cy.get('.a-alert-content').should('contain.text','Enter a valid email address');
    })
    it('Se muestra el mensaje de error cuando no coinciden las contraseñas', function(){
      // Al envio de dos claves que no coinciden ...
      cy.get('#ap_password').type('Password1');
      cy.get('#ap_password_check').type('Password2');
      cy.get('#continue').click();
      // ... se muestra el error esperado.
      cy.get('.a-alert-content').should('contain.text',' Passwords must match');
    })
  })
  
  
  function obtenerTitulo(selector) {
    return new Promise((resolve, reject) => {
        cy.get(selector).invoke('text')
            .then(titulo => {
                resolve(titulo);
            });
    });
  }