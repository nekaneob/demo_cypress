# Demo Cypress/Mochawesome

_Este proyecto contiene una demo de navegación automatizada en amazon.com._

## Pruebas realizadas 🔍

```
Los apartados de la web que se testearán son los siguientes:

Home 
◦ La imagen del banner se muestra y contiene un .jpg. 
◦ El menú “Todo” se muestra y oscurece el fondo. 
◦ El footer tiene 4 columnas. 

Busqueda y ficha de producto
◦ Realizar la busqueda de un producto e interceptar la llamada de sugerencias de producto que se realiza. Comprobar que  devuelva un 200. 
◦ Todos los productos que se muestran contienen una imagen de  formato jpg. 
◦ Todos los productos que se muestran tienen precio. 
◦ Hacer click en “Comprar ya” y redigire bien a la pantalla de  login. 

Formulario de registro:
◦ Se muestran los mensajes de error al enviar el formulario vacío. 
◦ Se muestra el mensaje de error al enviar un email incorrecto. 
◦ Se muestra el mensaje de error cuando no coinciden las  contraseñas.  

```


## Comenzando 🚀

### Pre-requisitos 📋

* [Node](https://nodejs.org/es/download/)
* [Code](https://code.visualstudio.com/download)
* [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) 

## Ejecutando las pruebas ⚙️

* Descargate el código de github.
* Abre la ubicacón del proyecto en la terminal de tu preferencia.

Si quieres visualizar la prueba con la UI de cypress, ejecuta el siguiente comando:
```
npm run cypress
```

Si quieres lanzar las pruebas headless y crear el report al mismo tiempo, ejecuta el siguiente comando:
```
npm run cypress:report
```

### Reporting ✒️

_El report se guarda en la carpeta demo_cypress\mochawesome-report_

## Autor 

Nekaneob


---

