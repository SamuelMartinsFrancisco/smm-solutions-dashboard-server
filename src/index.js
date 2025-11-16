import dotenv from 'dotenv';
import app from "./app.js";

dotenv.config();

app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`\n The server is listening on port ${process.env.SERVER_PORT}! 😁 \n`)
})