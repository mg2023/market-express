const jwt = require('jsonwebtoken')

function verificarExistenciaDeCredenciales(fields) {
  return function (req, res, next) {

    const missingFields = fields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {

      return res.status(400).json({ error: `Faltan campos: ${missingFields.join(', ')}` });
    }

    next();
  };
}

const verificarToken = (req, res, next) => {
  try {
    //ACA HAY UN PROBLEMA, NO ATRABA EL ERROR CUANDO NO ENVIAN EL HEADER

    const token = req.header("Authorization").split("Bearer ")[1]

    if (!token) throw {
      code: 401,
      message: "Debes incluir token en el header"
    }

    const tokenValido = jwt.verify(token, 'clavesecreta')
    // otra opcion para decodificar
    // const {email} = jwt.decode(token)

    req.email = tokenValido.email
    next()
  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
      console.error('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      console.error('Token expired');
    } else {
      console.error('Unknown error', error);
    }
    res.status(error.code || 500).send(error.message)


  }


}


const logEnElTerminal = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- Recibe llamada de tipo ${req.method}, en la ruta ${req.path}`)
  next()
}

module.exports = { verificarExistenciaDeCredenciales, verificarToken, logEnElTerminal } 