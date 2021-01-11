  describe('Test Registro', function(){

    before(function(){
      cy.visit('https://www.amazon.es/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.es%2Fgp%2Fcart%2Fview.html%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=esflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&')
      cy.fixture('registro').then(function(data) {
        this.data = data
      })
    })

    it('Accede al formulario de registro', function(){
      cy.get('#createAccountSubmit').click();
      cy.url().should('include', 'register');
    })

    it('Se muestran los mensajes de error al enviar el formulario vacio', function(){
      cy.get('#continue').click();
      cy.get('.a-alert-content').should('contain.text','Introduce tu nombre');
      cy.get('.a-alert-content').should('contain.text','Introduce tu dirección de e-mail');
      cy.get('.a-alert-content').should('contain.text','Introduce tu contraseña');
    })

    it('Se muestra el mensaje de error al enviar un email incorrecto', function(){
      cy.get('#ap_email').type(this.data.mail);
      cy.get('#continue').click();
      cy.get('.a-alert-content').should('contain.text','Introduce tu dirección de e-mail');
    })

    it('Se muestra el mensaje de error cuando no coinciden las contraseñas', function(){
      cy.get('#ap_password').type(this.data.password1);
      cy.get('#ap_password_check').type(this.data.password2);
      cy.get('#continue').click();
      cy.get('.a-alert-content').should('contain.text','Las contraseñas no coinciden');
    })
  })
  
  
  
  