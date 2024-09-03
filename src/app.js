
import express from "express";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";
import userRoutes from "./routes/user.routes.js";
const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())


app.use("/api/v1/users", userRoutes)

app.use((err, req, res, next) => {
    // logic
    let { statusCode, message } = err;

    if (!(err instanceof ApiError)) {
        statusCode = 500;
        message = 'Internal Server Error';
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
})

// this is default in case of unmatched routes
app.use(function(req, res) {
    // Invalid request
          res.json({
              'statusCode':404,
              'message':'Invalid Request',
              'statusCode':404,
          });
});

export { app }