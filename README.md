# Interceptores de Axios

El proyecto está desarrollado con vue 3 y typescript. en vite. Además se utilizó vuetify para facilitar la construcción de los elementos visuales.

## Configuración de IDE recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Configuración del proyecto

```sh
npm install
```

### Compilación y carga en caliente para desarrollo

```sh
npm run dev
```

### Chequeo de tipos, compilación y minificación para producción

```sh
npm run build
```

## Introducción

El objetivo es compartir una de las tantas utilidades que se le puede dar a los interceptores de Axios. 
En este caso lo vamos a utilizar para mostrar mensajes al usuario, de acuerdo a respuestas de llamadas a una [API pública](https://restcountries.com/).

## Comencemos

Lo primero que vamos a hacer es configuarr algunas variables de entorno.
> .env

