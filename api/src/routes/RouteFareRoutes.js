// create a router for routes and fares 
const express = require("express");
const router = express.Router();
const RouteFareController = require("../controllers/RouteFareController");


//get all fares 
router.get("/fares", RouteFareController.getAllFares);
// Create a new fare for a route
router.post("/fares/:routeId", RouteFareController.createFare);
// Get fare by route ID
router.get("/fares/:routeId", RouteFareController.getFareByRouteId);
// Update fare by ID
// router.put("/fares/:fareId", RouteFareController.updateFare);
// Delete fare by ID
// router.delete("/fares/:fareId", RouteFareController.deleteFare);



// Create a new route
router.post("/", RouteFareController.createRoute);
// Get all routes
router.get("/", RouteFareController.getAllRoutes);
// Get route by ID
// router.get("/:routeId", RouteFareController.getRouteById);
// Update route by ID
// router.put("/:routeId", RouteFareController.updateRoute);
// // Delete route by ID
// router.delete("/:routeId", RouteFareController.deleteRoute);


module.exports = router;