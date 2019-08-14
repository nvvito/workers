const router = require('express').Router()
//model
const method = require('../../controllers/department')
//router
router.get('/', method.getAll)
router.get('/:id', method.getOneById)
router.post('/', method.createOne)
router.put('/:id', method.updateOneById)
router.delete('/:id', method.deleteOneById)
//custom method

//export
module.exports = router