// user.routes.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

// Create a new user
router.post('/add', userController.createUser)
router.post('/chargeCustomer', userController.chargeCustomer)

// Get all users
router.get('/', userController.getAllUsers)

// Get a user by ID
router.get('/:id', userController.getUserById)

// Update a user by ID
router.put('/:id', userController.updateUserById)

// Delete a user by ID
router.patch('/:id', userController.deleteUserById)

module.exports = router
