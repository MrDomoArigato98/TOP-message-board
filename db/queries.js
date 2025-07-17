const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=($1)", [
    id,
  ]);
  return rows;
}

async function addMessage(username, message) {
  try {
    const result = await pool.query(
      `
    INSERT INTO messages (username, message, posted_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    RETURNING *`,
      [username, message]
    );
  } catch (error) {
    console.error(`Error adding message: ${error}`);
  }
}
async function deleteAllUsernames() {
  const result = await pool.query("DELETE FROM usernames");
  return result;
}
module.exports = {
  getAllMessages,
  getMessage,
  addMessage,
};
