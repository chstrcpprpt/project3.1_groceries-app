const express = require("express");
const mongoose = require("mongoose");

// location of api routes
const groceries = require("./routes/api/groceries");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongoDB (the object avoids warnings)
mongoose.connect(db, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use routes - api/groceries/* will go to this file
app.use("/api/groceries", groceries);

// START SERVER
// Define port localhost:3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

