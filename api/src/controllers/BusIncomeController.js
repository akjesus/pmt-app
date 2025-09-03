// CRUD for bus loading information
const BusIncome = require('../models/BusIncomeModel');

exports.createLoadingInfo = async (req, res) => {
    try {
        // Create loading info object from body array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }
        const loadingInfo = req.body.map(item => ({
            vehicleId:item.vehicleId,
            name: item.name,
            routeId: item.routeId,
            transDate: Date.now(),
            fare: item.fare,
            fuel: item.fuel,
            passengers: item.passengers,
            income: item.income,
            createdBy: req.user.id,
        }));


        // Save loading information to the database
        if (loadingInfo.length === 0) {
            return res.status(400).json({ message: 'No loading information provided' });
        }
// save each loading info object
        for (const info of loadingInfo) {
            
                // Create new record
                const newLoadingInfo = new BusIncome(info);
                await newLoadingInfo.save();
            }

        res.status(201).json({ message: 'Loading information created successfully', data: loadingInfo });
    } catch (error) {
        console.error('Error creating loading info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Get all loading information
exports.getAllLoadingInfo = async (req, res) => {
    try {
        // Fetch all loading information from the database
        const loadingInfo = await BusIncome.find()
          .populate("vehicleId", "name")
          .populate("routeId", "desc")
          .populate("createdBy", "username");

        res.status(200).json (loadingInfo);
    } catch (error) {
        console.error('Error fetching loading info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}