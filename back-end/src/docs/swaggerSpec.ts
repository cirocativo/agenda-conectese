import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: "Agenda ConecteSe",
    version: "1.0",
    description:
      "Projeto Full-stack - Cadastro e consulta de clientes com vínculo de contatos",
  },
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/docs/swaggerDefinitions/*.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
