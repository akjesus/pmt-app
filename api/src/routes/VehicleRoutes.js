// create a vehicle router 
const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/VehicleController");

// Create a new vehicle
router.post("/", VehicleController.createVehicle);
router.post("/bulk", VehicleController.bulkcreateVehicle);
// Get all vehicles
router.get("/", VehicleController.getAllVehicles);
// Get a vehicle by ID
router.get("/:id", VehicleController.getVehicleById);
// Update a vehicle by ID
router.put("/:id", VehicleController.updateVehicleById);
// Delete a vehicle by ID
router.delete("/:id", VehicleController.deleteVehicleById);


module.exports = router;