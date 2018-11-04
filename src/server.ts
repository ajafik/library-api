import * as dotenv from "dotenv";
import app from "./app";
import * as db from "./db";

dotenv.config();
new db.DB().connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // console.log(`Library API running on Port : ${PORT}`);
});
