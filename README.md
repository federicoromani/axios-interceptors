# Interceptores de Axios

El proyecto está desarrollado con vue 3 y typescript, en vite. Además se utilizó vuetify para facilitar la construcción de los elementos visuales, pero sin priorizar UX/UI.

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

Está dirigido a desarrolladores que ya tienen algo de experiencia con Vue.

Queda fuera del alcance de este instructivo, conceptos o temas relacionados a:
- Axios (básico)
- Typescript
- Vue router
- Composition API
- Vuetify
- etc

Asumimos que son temas conocidos. El foco de este instructivo es el uso de interceptores.

## Comencemos

### Variables de entorno

Lo primero que vamos a hacer es configuar algunas variables de entorno.
<p style="color: grey"><em>/.env</em></p>

```env
VITE_APP_TITLE=Axios Interceptors
VITE_API_URL=https://restcountries.com/v3.1
```
### Stores

El segundo paso es definir los **stores** de los mensajes y el del _loader_ que vamos a mostrar mientras la respuesta de la API esté pendiente.
Vamos a usar la forma simple que propone vuejs a través del uso de <code>reactive()</code>, para almacenar los estados.

<p style="color: grey"><em>/src/stores/ui.store.ts</em></p>

```ts
export const toastMessageStore = reactive<Toast>({
	titleMessage: '', 
	message: '', 
	typeMessage: '', 
	show: false
});

export const loaderStore = reactive<Loader>({
	show: false
});

// ... Ver código completo en el proyecto
```
Interfaces de datos (Toast, Loader) 
<p style="color: grey"><em>/src/models/UI.ts</em></p>

```js
// Ver código en el proyecto
```

### Componentes

Vamos a definir los componentes que van a consumir los [stores](#stores)

> /src/common/components
>> ToastMessage.vue <br>
```ts
import { toastMessageStore } from '@/stores/ui.store'
import { ColorMessage, IconMessage } from '@/models/UI'

const { titleMessage, message, typeMessage, show } = toRefs(toastMessageStore)
// ... Ver código completo en el proyecto
```
```html
<v-snackbar v-model="show" :timeout="4000" :color="toastColor">
    <div class="text-subtitle-1"><v-icon size="large" :icon="toastIcon" class="mr-2"> </v-icon>{{ titleMessage }}</div>
    <div class="text-subtitle-2 ml-4 pa-4">{{ message }}</div>

    <template v-slot:actions>
        <v-btn color="black" icon @click="show = false">
        <v-icon>mdi-close</v-icon>
        </v-btn>
    </template>
</v-snackbar>
<!-- ... Ver código completo en el proyecto -->
```
>> ApiLoader.vue
```ts
import { loaderStore } from '@/stores/ui.store'
// ... Ver código completo en el proyecto
```
```html
<v-overlay :model-value="show" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="50"></v-progress-circular>
</v-overlay>
<!-- ... Ver código completo en el proyecto -->
```

### Uso de los componentes

En este caso creamos un _layout_ para que nuestra aplicación pueda crecer y tener mas de una vista. Por el mismo motivo usamos rutas.

Los [componentes](#componentes) van a formar parte del _layout_ para que estén disponibles en todas las vistas y se muestren de acuerdo a su estado (valor de sus [stores](#stores)).

<p style="color: grey"><em>/src/layouts/AppLayout.vue</em></p>

```ts 
import ToastMessage from '@/common/components/ToastMessage.vue'
import ApiLoader from '@/common/components/ApiLoader.vue';
```
```html
<v-app id="new-app" class="w-100">
    <v-main class="bg-grey-lighten-5">
        <v-container class="bg-transparent" fluid style="height: 100%">
        <router-view></router-view>
        </v-container>
    </v-main>
    <toast-message />
    <api-loader />
</v-app>
```

### Gestión de estado

Finalmente llegamos a la parte importante de este instructivo.

El [estado](#stores) de los [componentes](#componentes) lo vamos a gestionar mediante interceptores de Axios.

Para ello necesitamos crear una nueva instancia de axios con algunas configuraciones, entre ellas la URL base de la API (definida en [variables de entorno](#variables-de-entorno)).

<p style="color: grey"><em>/src/plugins/axios.ts</em></p>

```ts
// ... Ver código completo en el proyecto
const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Accept: `application/json;`,
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
```
Además vamos a definir los interceptores de peticiones y de respuestas necesarios para la manipulación de [estado](#stores) de los [componentes](#componentes)

#### Interceptor de petición

Aquí vamos a mostrar el _loader_ o vamos a imprimir errores en consola.

```ts
api.interceptors.request.use(function (config) { 
  // Muestro el loader
  loaderStore.show = true;
  return config;
}, function (error) {
  // Si hay error, oculto el loader
  loaderStore.show = false;
  if (error.request) {
    if(import.meta.env.DEV) console.log('request', error.request);
  } else {
    if (import.meta.env.DEV) console.log('Error', error.message);
  }
  if(import.meta.env.DEV) console.log('config', error.config);
  return Promise.reject(error);
});
// ... Ver código completo en el proyecto
```

#### Interceptor de respuesta

Ocultaremos el _loader_ y mostraremos el tipo de mensaje que corresponda.

```ts
api.interceptors.response.use(function (response) {
  // Oculto el loader
  loaderStore.show = false;
  // Defino el mensaje para una respuesta satisfactoria
  titleMessage.value = 'Success'
  message.value = 'Not Errors'
  typeMessage.value = 'success'
  // Muestro el mensaje
  show.value = true
  return response;
}, function (error) {
  // Si hay error, oculto el loader
  loaderStore.show = false;
  if (error.response?.data) {
    // Defino el mensaje para una respuesta con errores
    titleMessage.value = error.response?.status ? `Error #${error.response.status}` : ''
    message.value = error.response.data.message
    typeMessage.value = 'danger'
    // Muestro el mensaje
    show.value = true
  } else {
    if (import.meta.env.DEV) console.log('error.message', error.message);
  }
  return Promise.reject(error);
});
// ... Ver código completo en el proyecto
```

## Demo
[Interceptores](https://federicoromani.github.io/axios-interceptors-dist/)
