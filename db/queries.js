const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    `SELECT * FROM "user" WHERE username = $1;`,
    [username]
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM "user" WHERE id = $1;`, [
    id,
  ]);
  return rows[0];
}



module.exports = { getUserByUsername, getUserById }
