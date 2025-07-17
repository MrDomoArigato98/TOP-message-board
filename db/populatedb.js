const { Client } = require("pg");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(30),
  message VARCHAR(100),
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, message)
VALUES 
  ('Bryan', 'Hello from Bryan'),
  ('Odin', 'Odin was here'),
  ('Damon', 'Damon says hi');
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await client.end();
  }
}

main();
