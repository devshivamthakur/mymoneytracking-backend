import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenRef = swaggerAutogen();  // Initialize swaggerAutogen

const doc = {
  info: {
    title: 'My API',
    description: 'Automatically generated API documentation with Bearer token authorization',
  },
  host: 'localhost:3000',  // Make sure this matches your server
  schemes: ['http', 'https'],  // You can change this to 'https' if needed
  securityDefinitions: {
    bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
    },
},
security: [{ bearerAuth: [] }],

};

const outputFile = './swagger-output.json';  // Path for the generated Swagger JSON
const endpointsFiles = ['../routes/*.js'];  // Path to your route files (adjust if necessary)

// Generate Swagger docs
swaggerAutogenRef(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated!');
  })
  .catch(err => {
    console.error('Error generating Swagger documentation:', err);
  });
