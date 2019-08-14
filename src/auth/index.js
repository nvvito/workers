const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  // read header token
  let token = req.headers[process.env.AUTH_HEADER_NAME] || req.headers['authorization'] // || req.headers['x-access-token']
  // read cookie token
  let is_cookie = process.env.AUTH_COOKIE === 'true' ? true : false
  if (is_cookie) {
    if (!token) token = req.cookies[process.env.AUTH_COOKIE_NAME] || req.cookies['authorization']
  }
  // verify token
  if (token) {
    // 'Bearer'
    let bearer = process.env.AUTH_BEARER_NAME || 'Bearer'
    if (token.startsWith(bearer + ' ')) {
      // Remove 'Bearer' from string
      token = token.slice(bearer.length+1, token.length)
      jwt.verify(token, process.env.AUTH_SECRET || 'secret', (err, decoded) => {
        if (!err) {
          //pass decoded data
          req.decoded = decoded
          next()
        } else return res.status(403).json({
          error: true,
          message: 'Token is not valid'
        })
      })
    } else return res.status(403).json({
      error: true,
      message: 'Auth bearer error'
    })
  } else return res.status(403).send({
    error: true,
    message: 'Auth token is not supplied'
  })
}
const createToken = (data, _option) => {
  let option = {
    expiresIn: process.env.AUTH_EXPIRESIN || '1d'
  }
  option = { ...option, ..._option }
  return jwt.sign(data, process.env.AUTH_SECRET || 'secret', option)
}
module.exports = {
  checkToken: checkToken,
  createToken: createToken,
}