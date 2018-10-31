import * as dotenv from "dotenv";
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Library API running on Port : ${PORT}`);
});