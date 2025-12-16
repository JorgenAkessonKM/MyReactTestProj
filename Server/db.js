const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'data.sqlite');
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function init() {
  await run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      email TEXT,
      password TEXT
    )`
  );

  const existing = await all('SELECT id FROM users LIMIT 1');
  if (!existing || existing.length === 0) {
    const hash = bcrypt.hashSync('password', 10);
    await run('INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)', [
      'Demo User',
      'demo',
      'demo@example.com',
      hash,
    ]);
  }
}

function createUser({ name, username, email, passwordHash }) {
  return run('INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)', [
    name,
    username,
    email,
    passwordHash,
  ]);
}

function getUserByUsername(username) {
  return get('SELECT id, name, username, email FROM users WHERE username = ?', [username]);
}

function getUserWithPasswordByUsername(username) {
  return get('SELECT * FROM users WHERE username = ?', [username]);
}

function getUserById(id) {
  return get('SELECT id, name, username, email FROM users WHERE id = ?', [id]);
}

function getAllUsers() {
  return all('SELECT id, name, username, email FROM users');
}

module.exports = {
  init,
  createUser,
  getUserByUsername,
  getUserWithPasswordByUsername,
  getUserById,
  getAllUsers,
};
