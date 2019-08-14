const router = require('express').Router()
//model
const method = require('../../controllers/worker')
//router
router.get('/', method.getAll)
router.get('/:id', method.getOneById)
router.post('/', method.createOne)
router.put('/:id', method.updateOneById)
router.delete('/:id', method.deleteOneById)
//custom routes
router.post('/view', method.getWorkersView)
router.post('/search', method.searchData)
//export
module.exports = router