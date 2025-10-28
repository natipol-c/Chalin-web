const express = require('express')
const router = express.Router()
const { listOrder, changeStatus, listOrderStatus, changeStatusUser } = require('../Controllers/order')
const { auth, adminCheck } = require('../Middleware/auth')





//http://localhost:5000/api/order
router.get('/order-status', auth, listOrderStatus);
router.get('/order', auth, adminCheck, listOrder)
router.post('/change-status', auth, adminCheck, changeStatus)
router.post('/change-status-user', auth, changeStatusUser);



module.exports = router