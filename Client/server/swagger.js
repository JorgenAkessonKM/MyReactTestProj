import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    tags: [
      {
        name: 'Health',
        description: 'Health and readiness endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Data',
        description: 'Data retrieval endpoints',
      },
    ],
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./server/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
