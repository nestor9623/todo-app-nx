## Look a demo
https://prueba-bi.vercel.app/dashboard


## Start the app

La aplicación se ejecuta con el comando npx nx run prueba-bi:start. Luego hay que poner en el navegador http://localhost:4200/ y echale un vistazo.

## Generate code

Se han generado diferentes sintaxis con NX, modulos , test mediante el GUI de next y así mismo con la consola propia de comandos de nx.

## Running tasks

Para ejecutar las tareas se deben ejecutar:

Este comando ejecuta todos los test en consola , sin ventana GUI
npx nx run-many --target=test

Este comando lanza la consola de Cypress y puede verse desde el navegador de Cypress(Configurado en el package.json)
npm run e2e

Para iniciar el proyecto con todos los modulos:
npx nx run prueba-bi:start

## Resumen utilizado

identificador: Libreria UUID => Generando los indices de cada registro
monorepositorios con : nx workspace
framework con: angular 17
ui library: boostrap
almacenamiento con: SessionStorage
Estilos con: clases propias de boostrap y un poco de estilo a la angtigua intentando aplicar con SASS(BEMM , OOCSS, SMACSS)
Librerias: Lodash


No se injecto ningún servicio puesto que el almacenamiento se utiliza con session storage y asi mismo para obtenerla , no se vio la necesidad de utilizar observables ni efectos ni nada por el estilo por ende no se uso RXJS.

## Dependencias
Lodash... al hacer un build tengo una dependencia con lodash.

## Consideraciones
ERROR TS5053: Option 'sourceMap' cannot be specified with option 'inlineSourceMap'.... Al final me toco cambiar la configuración en el tsconfig.base.json

Ante nada muchas gracias por la oportunidad.


