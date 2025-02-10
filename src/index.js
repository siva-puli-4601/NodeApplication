import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./.env",
});


    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });

  
