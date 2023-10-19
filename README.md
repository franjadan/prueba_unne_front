# unne_front_vue

## Configuración del Proyecto

npm install

### Generar entorno de desarrollo y producción

cp .env.example .env

cp .env.example .env.production

Para el funcionamiento correcto de la aplicación es necesaria una variable de entorno VUE_APP_API_URL con la url de la api y la versión requerida, en este caso v1.

Por ejemplo: 

VUE_APP_API_URL=http://localhost/api/v1

VUE_APP_API_URL=http://localhost:8000/api/v1

### Compilar y recargar en caliente para desarrollo

npm run serve

### Compilar y minimizar para producción

npm run build

### Ejecutar tests

npm run test:unit

