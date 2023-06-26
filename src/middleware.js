const jwt = require("jsonwebtoken");

function verificarExistenciaDeCredenciales(fields) {
  return function (req, res, next) {
    const missingFields = fields.filter((field) => !(field in req.body));

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Faltan campos: ${missingFields.join(", ")}` });
    }

    next();
  };
}

const verificarToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "No authorization header found",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "clavesecreta");
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid authorization token",
    });
  }
};

module.exports = { verificarExistenciaDeCredenciales, verificarToken };
