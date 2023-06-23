const productsRouter = require("../routes/products");
const ordersRouter = require("../routes/orders");
const usersRouter = require("../routes/users");
const usersRouterv2 = require("../routes/usersv2");

const preferencesRouter = require("../routes/preferences");
const contactRouter = require("../routes/contact");

function apiRouter(app) {
  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/orders", ordersRouter);
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/preferences", preferencesRouter);
  app.use("/api/v1/contact", contactRouter);

  app.use("/api/v2/users", usersRouterv2);
}

module.exports = { apiRouter };
