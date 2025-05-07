import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WorkXplore API",
      version: "1.0.0",
      description: "API documentation for the WorkXplore platform",
    },
    servers: [
      {
        url: "https://workxplore.onrender.com", // replace with your actual Render backend URL
      },
    ],
  },
  apis: ["./routes/*.js"], // location of your route files for annotation
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
