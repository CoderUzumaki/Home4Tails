import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants";

const app = express();

/**
 * Middleware to enable CORS
 * @origin - allows requests from the specified origin
 * @credentials - allows cookies to be sent with requests
 * @methods - allows the specified HTTP methods
 * @allowedHeaders - allows the specified headers to be sent with requests
 */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

/**
 * Middleware to parse JSON data
 * @limit tells express to limit the size of the JSON data to specified limit
 * @type application/json - tells express to parse only application/json data
 */
app.use(express.json({
    limit: LIMIT,
    type: "application/json",
}));

/**
 * Middleware to parse URL-encoded data
 * @limit 16kb - tells express to limit the size of the URL-encoded data to 16kb
 * @extended true - allows nested objects in the URL-encoded data
 */
app.use(express.urlencoded({
    extended: true,
    limit: LIMIT
}))

/**
 * Middleware to serve static files
 * @path public - tells express to serve static files from the public directory
 */
app.use(express.static("public"));

/**
 * Middleware to parse cookies and perform cookie operations
 */
app.use(cookieParser());

export {app};
