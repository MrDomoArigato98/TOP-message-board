const { Client } = require("pg");
require("dotenv").config();

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
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT || 5432,
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
