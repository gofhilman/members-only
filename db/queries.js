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

async function getAllPosts() {
  const { rows } = await pool.query(`
    SELECT post.id, title, content, "timestamp", fullname
    FROM post JOIN "user" ON "user".id = post.user_id
    ORDER BY "timestamp" DESC;
  `);
  return rows;
}

async function deletePost(id) {
  await pool.query(`DELETE FROM post WHERE id = $1;`, [id]);
}

async function insertPost(title, content, userId) {
  const now = new Date().toISOString();
  await pool.query(
    `INSERT INTO post (title, content, user_id, "timestamp")
    VALUES ($1, $2, $3, $4);`,
    [title, content, userId, now]
  );
}

async function insertUser(fullname, username, hashedPassword) {
  await pool.query(
    `INSERT INTO "user" (fullname, username, password, member, admin)
    VALUES ($1, $2, $3, FALSE, FALSE);`,
    [fullname, username, hashedPassword]
  );
}

async function updateMember(id) {
  await pool.query(`UPDATE "user" SET member = TRUE WHERE id = $1`, [id]);
}

async function updateAdmin(id) {
  await pool.query(`UPDATE "user" SET admin = TRUE WHERE id = $1`, [id]);
}

module.exports = {
  getUserByUsername,
  getUserById,
  getAllPosts,
  deletePost,
  insertPost,
  insertUser,
  updateMember,
  updateAdmin,
};
