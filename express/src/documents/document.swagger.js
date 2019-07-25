const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const document = (directory='**') => swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: '',
      version: '',
      description: '',
    },
    host: 'localhost:3000',
    // basePath: '/',
    schemes: [ 'http' ],
    securityDefinitions: {
      kong: {
        type: 'apiKey',
        name: 'username',
        in: 'header'
      }
    }
  }, 
  apis: [`./src/documents/${directory}/*.yaml`]
});

router.use('/doc', 
  swaggerUi.serve,
  swaggerUi.setup(document())
);



module.exports = router;