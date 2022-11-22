// Import all required packages for backend operation
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express(); // main thing - Call express js
// Import Middlewared For Errorhandler and API URL Mismatch Founc
const { notFound, errorHandler } = require("./middlewares/ErrorMiddleware");
// Import application api routes
const userRoutes = require("./routes/UserRoutes");
const salaryRoutes = require("./routes/SalaryRoutes");
const extraIncomeRoutes = require("./routes/ExtraIncomeRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const groceryRoutes = require("./routes/GroceryRoutes");

dotenv.config();
connectDB();

app.use(express.json()); // to accept json data
app.use("/", userRoutes); // Use user routes for api call
app.use("/", salaryRoutes); // Use salary routes for api call
app.use("/", extraIncomeRoutes); // Use extra income routes for api call
app.use("/", expenseRoutes); // Use expense routes for api call
app.use("/", groceryRoutes); // Use grocery routes for api call

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server started here
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on PORT ${port}`));
