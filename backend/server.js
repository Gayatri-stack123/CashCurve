require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const connectDB = require("./config/db");
const authRoutes= require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
// const expenseRoutes=require("./routes/expenseRoutes");

const app = express();

//middle were to handle CORS
app.use(
    cors({
        origin:process.env.CLIENT_URL|| "*",
        method:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-type","Authorization"],
    })
);

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

connectDB();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
// app.use("/api/v1/auth",expenseRoutes);

//server uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log('Server running on port', PORT));