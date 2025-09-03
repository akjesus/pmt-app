//bus expenses controller

const BusExpenses = require('../models/BusExpenseModel');

exports.getAllBusExpenses = async (req, res) => {
    try {
        const expenses = await BusExpenses.find()
          .populate("vehicleId", "name")
          .populate("createdBy", "username");
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bus expenses', error });
    }
}

exports.createBusExpense = async (req, res) => {
  const user = req.user.id;
  try {
    const { vehicleId, source, expensesItems, name } = req.body;
    if (!Array.isArray(expensesItems) || expensesItems.length === 0) {
      return res.status(400).json({ message: "No expense items provided" });
    }

    const newExpense = await BusExpenses.create({
      name,
      vehicleId,
      source,
      expensesItems,
      createdBy: user,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.log("Error creating bus expense:", error);
    res.status(500).json({ message: "Error creating bus expense", error });
  }
};