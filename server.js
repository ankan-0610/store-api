const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const storeRoutes = require("./routes/storeRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api", productRoutes);
app.use("/api", storeRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
