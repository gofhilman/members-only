const { argv } = require("node:process");
const { Client } = require("pg");
const fs = require("node:fs/promises");
const path = require("node:path");

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  const SQL = await fs.readFile(path.join(__dirname, "populatedb.sql"), {
    encoding: "utf8",
  });
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
