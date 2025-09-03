// // Server entry point
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.API_PORT;
const IP_ADDRESS = process.env.API_SERVER_IP || "localhost";

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch((error) => {     
  console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`API Server running on http://${IP_ADDRESS}:${PORT}`);
});