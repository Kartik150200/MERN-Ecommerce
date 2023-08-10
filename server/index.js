import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import flash from "connect-flash";
import path from "path";
import mongoose from "mongoose";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import setupPassport from "./config/passportSetup.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

// use cookieSession
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);

// initialise passport middleware to use sessions, and flash messages
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// setup passport
setupPassport();

// configure all the routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

const _dirname = path.resolve();

// middleware to act as fallback for all 404 errors
app.use(notFound);

// configure a custome error handler middleware
app.use(errorHandler);

const CONNECTION_URL =
  "mongodb+srv://killua1502:killuaisawesome@cluster5.tlv5sud.mongodb.net/MERN-Ecommerce?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Product.insertMany(products);
  })
  .catch((error) => console.log(error.message));
