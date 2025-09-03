// Bus Expense Routes
const express = require('express');
const router = express.Router();
const BusExpensesController = require('../controllers/BusExpensesController');
const {verifyToken} =  require('../controllers/AuthController')


// Get all bus expenses
router.get('/', BusExpensesController.getAllBusExpenses);
// Create a new bus expense
router.post("/", verifyToken, BusExpensesController.createBusExpense);

// Export the router
module.exports = router;
