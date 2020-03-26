const mongoose = require("mongoose");

const GroceriesSchema = new mongoose.Schema({

  item: {
    type: String,
    unique: true,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  isPurchased: {
    type: Boolean,
    default: false
  },

});

// Create model
const GroceriesModel = mongoose.model("Groceries", GroceriesSchema);

// Export model
module.exports = GroceriesModel;