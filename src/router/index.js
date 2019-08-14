const router = require('express').Router()
const path = require('path')
//auth
const checkToken = require('../auth').checkToken
const createToken = require('../auth').createToken
//routes
const worker = require('./routes/worker')
const department = require('./routes/department')
//worker routes
router.use('/api/worker', checkToken, worker)
//department routes
router.use('/api/department', checkToken, department)
//auth
router.post('/api/auth', (req, res) => {
    let { username, password } = req.body
    if (username === 'user' && password === 'password') {
        let token = createToken(req.body)
        res.json({
            success: true,
            message: token,
        })
    }
    else return res.status(403).send({
        error: true,
        message: 'invalid username or password'
    })
})
//index
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
//export 
module.exports = router