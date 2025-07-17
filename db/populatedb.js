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
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end;
  console.log("done");
}

main();
