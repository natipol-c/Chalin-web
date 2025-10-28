const express = require('express')
const router = express.Router()
const {
    read,
    list,
    create,
    update,
    remove,
    listby,
    Cartby
    

} = require('../Controllers/product')

//middleware
const {auth} = require('../Middleware/auth')
const {upload} = require('../Middleware/upload')
const {uploadSlip} = require('../Middleware/uploadSlip')




//http://localhost:5000/api/product
router.get('/product',list)
router.post('/productby',listby)

router.post('/placeorder',uploadSlip, Cartby);



router.get('/product/:id',read)
router.post('/product',upload,create)
router.put('/product/:id',upload,update)
router.delete('/product/:id',remove)


module.exports = router