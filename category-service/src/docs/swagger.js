import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce",
            version: "1.0.0",   
            description: "Category-service API Documentation",
        },
        servers: [{ url: "http://localhost:3002/api/v1/cate" }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          persistAuthorization: true, // Keeps token after refresh
        },
      }));
    // console.log("Swagger Docs available at http://localhost:5000/api-docs");
};

export default swaggerDocs;
