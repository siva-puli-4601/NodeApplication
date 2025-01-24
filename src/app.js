
import express from 'express';
import cors from "cors";


const app=express();

app.use(cors(
    {
        origin: process.env.CROS_ORIGIN,
        credentials: true,
    }
));

// common middleware's

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({ extended:true, limit:"16kb"})) // if the urls containing space it comes like a %20 this once use
app.use(express.static("public"))  // used for serve things llike images, pdf

// router imports

import { healthcheckRouter } from './routes/healthCheckRouters.js';
import { ApiError } from './utils/ApiError.js';

app.use('/api/v1/healthcheck',healthcheckRouter);


// For handling global errors
app.use((err, req, res, next) => {
    
    res.status(err.status || 500).json(
        new ApiError(err.message,err.status || 500,err)
    );
  });

export {app}