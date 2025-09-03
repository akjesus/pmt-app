//create a model for routes 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema(
  {
    desc: { type: String, required: true, unique: true },
    fare: {
      type: Schema.Types.ObjectId,
      ref: "Fare",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", RouteSchema);

