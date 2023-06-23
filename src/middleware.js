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
  try {
    let token = req.header("Authorization");
    console.log(token)

    if (!token)
      throw {
        code: 401,
        message: "Token not found",
      };

    token = req.header("Authorization").split("Bearer ")[1];

    const decodedToken = jwt.verify(token, "clavesecreta");
    // otra opcion para decodificar
    // const {email} = jwt.decode(token)

    req.email = decodedToken.email;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("Invalid token");
    } else if (error.name === "TokenExpiredError") {
      console.error("Token expired");
    } else {
      console.error("Unknown error", error);
    }
    res.status(error.code || 500).send(error.message);
  }
};

module.exports = { verificarExistenciaDeCredenciales, verificarToken };
