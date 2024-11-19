import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import 'dotenv/config'; // Load environment variables

// App configuration
const app = express();
const port = process.env.PORT || 4000; // Use PORT from environment, fallback to 4000

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB(); // Ensure connectDB() reads the MongoDB URI from the environment

// API endpoints
app.use("/api/food", foodRouter);
app.use("/image", express.static('uploads')); // Serve static images
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default route to check API status
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
