// swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Saas Boilerplate APIs',
      version: '1.0.0',
      description: 'API documentation for your Meteor.js application',
    },
    servers: [{
      url: 'http://localhost:3000/', // Replace with your server URL
    }],
  },
  apis: ['/imports/**/*.js'], // Adjust path to your API files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
