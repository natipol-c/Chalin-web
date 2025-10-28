const express = require('express')
const router = express.Router()
const { list,changeRole,resetOrderCount } = require('../Controllers/user')
const { auth, adminCheck } = require('../Middleware/auth')





//http://localhost:5000/api/user
router.get('/user', auth, adminCheck, list)
router.post('/change-role', auth, adminCheck, changeRole)
router.post('/user/reset-order-count', resetOrderCount);



module.exports = router