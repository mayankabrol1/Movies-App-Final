require("dotenv").config({ path: ".env.backend" });

const app = require("./app");
const { connectDb } = require("./config/db");

const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start();
