const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: { title: "Marketplace", version: "1.0.0"}
// 	},
// 	apis: ["index.js","./src/server/server.js","./src/routes/*.js"]
// }

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace",
      description: "API documentation for the Node.js Express API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            product_name: {
              type: "string",
              example: "Product A",
            },
            descrip: {
              type: "string",
              example: "Product description",
            },
            cost: {
              type: "number",
              example: 1000,
            },
            price: {
              type: "number",
              example: 2000,
            },
            stock_quantity: {
              type: "integer",
              example: 100,
            },
            url_img: {
              type: "string",
              example: "https://example.com/product_image.jpg",
            },
            stars_quantity: {
              type: "integer",
              example: 4,
            },
            category: {
              type: "string",
              example: "Electronics",
            },
            is_new: {
              type: "boolean",
              example: true,
            },
            is_special_offer: {
              type: "boolean",
              example: false,
            },
          },
          required: [
            "product_name",
            "descrip",
            "cost",
            "price",
            "stock_quantity",
            "url_img",
            "stars_quantity",
            "category",
            "is_new",
            "is_special_offer",
          ],
        },
      },
    },
  },
 
  apis: ["index.js","./src/server/server.js","./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/doc.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocs);
  });

  console.log(`Version 1 swagger docs  on http://localhost:${port}`);
};

module.exports = { swaggerDocs };
