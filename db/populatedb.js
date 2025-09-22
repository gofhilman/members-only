const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fullname TEXT, 
    username TEXT,
    password TEXT,
    member BOOLEAN,
    admin BOOLEAN
  );

  CREATE TABLE IF NOT EXISTS post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    content TEXT,
    user_id UUID REFERENCES "user" ON DELETE SET NULL (user_id),
    "timestamp" TIMESTAMPTZ
  );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
