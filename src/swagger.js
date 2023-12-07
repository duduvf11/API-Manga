const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'Manga API',
      description: 'Description'
    },
    host: 'localhost:1105',
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles)