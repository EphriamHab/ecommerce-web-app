import express from "express";
import colors from "colors/index.js";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import session from "express-session";
import path from "path";

//configure env
dotenv.config();

// datbase config
connectDB();

const app = express();

const sessionSecret = process.env.SESSION_SECRET || "5gdfdhk7k75d5egu0";

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce Full sack project</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
