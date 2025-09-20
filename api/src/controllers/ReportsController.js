const BusExpenses = require('../models/BusExpenseModel')
const BusIncome = require('../models/BusIncomeModel')



exports.busPerformance = async (req, res) => {
    const { startBus, stopBus, startDate, endDate } = req.query;
    if (!startBus || !stopBus || !startDate || !endDate) {
        return res.status(400).json({ error: "Invalid PMT or Date Range" });
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        // Income aggregation
        const incomePipeline = [
          {
            $match: {
              name: { $gte: parseInt(startBus), $lte: parseInt(stopBus) },
              transDate: { $gte: start, $lte: end },
            },
          },
          {
            $group: {
              _id: "$name",
              totalIncome: { $sum: "$income" },
              passengers: { $sum: "$passengers" },
              fuel: { $sum: "$fuel" },
            },
          },
        ];
        const incomeResult = await BusIncome.aggregate(incomePipeline);
        // Expenses aggregation
        const expensePipeline = [
            {
                $match: {
                    name: { $gte: parseInt(startBus), $lte: parseInt(stopBus) },
                    transDate: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: "$name",
                    expenses: { $sum: { $sum: "$expensesItems.amount" } },

                },
            },
        ];
        const expenseResult = await BusExpenses.aggregate(expensePipeline);
        // Merge results by bus name
        const report = {};
        incomeResult.forEach(i => {
            report[i._id] = { totalIncome: i.totalIncome, fuel: i.fuel, passengers: i.passengers };
        });
        expenseResult.forEach(e => {
            if (!report[e._id]) report[e._id] = { totalIncome: 0, expenses: 0, passengers: 0 };
            report[e._id].expenses = e.expenses;
        });
        // Add net income
        Object.keys(report).forEach(bus => {
            if(report[bus].expenses) {
                report[bus].totalExpenses = report[bus].expenses + report[bus].fuel;
                report[bus].netIncome =
                  report[bus].totalIncome - report[bus].totalExpenses;
            }
            else {
                report[bus].totalExpenses = report[bus].fuel;
                report[bus].netIncome =
                  report[bus].totalIncome - report[bus].totalExpenses;
            }
            
        });

        // Convert report object to array
        const resultArray = Object.entries(report).map(([bus, data]) => ({ bus, ...data }));
        if (resultArray.length === 0) {
            return res.status(404).json({ error: "No data found for the given range" });
        }
        console.log(resultArray);
        return res.status(200).json(resultArray);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

