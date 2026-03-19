import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const dbPath = path.join(dataDir, "client.sqlite");
const port = Number(process.env.DB_SERVER_PORT || 8080);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    token TEXT NOT NULL,
    region TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS data (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  )
`);

const upsertUserStmt = db.prepare(`
  INSERT INTO users (name, token, region)
  VALUES (@name, @token, @region)
  ON CONFLICT(name) DO UPDATE SET
    token = excluded.token,
    region = excluded.region
`);

const upsertData = db.prepare(`
  INSERT INTO data (id, data)
  VALUES (@id, @data)
  ON CONFLICT(id) DO UPDATE SET
    data = excluded.data
`);

const getUserByNameStmt = db.prepare(
  "SELECT name, token, region FROM users WHERE name = ?",
);

const app = express();
app.use(cors({ origin: true, credentials: true}));
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @openapi
 * /api/db/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/api/db/health", (_req, res) => {
  res.json({ ok: true, dbPath });
});

/**
 * @openapi
 * /api/db/users/{name}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
app.get("/api/db/users/:name", (req, res) => {
  const name = req.params.name?.trim();
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  const user = getUserByNameStmt.get(name);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

/**
 * @openapi
 * /api/db/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create or update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, token, region]
 *             properties:
 *               name:
 *                 type: string
 *               token:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       200:
 *         description: User saved
 *       400:
 *         description: Missing required fields
 */
app.post("/api/db/users", (req, res) => {
  const name = String(req.body?.name || "").trim();
  const token = String(req.body?.token || "").trim();
  const region = String(req.body?.region || "").trim();

  if (!name || !token || !region) {
    res
      .status(400)
      .json({ error: "name, token and region are required fields" });
    return;
  }

  upsertUserStmt.run({ name, token, region });
  res.json({ ok: true, saved: { name, region } });
});

const getDataById = db.prepare(
  "SELECT id, data FROM data WHERE id = ?",
);

/**
 * @openapi
 * /api/db/data/{id}:
 *   get:
 *     tags:
 *       - Data
 *     summary: Get data by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data found
 *       400:
 *         description: Missing id
 *       404:
 *         description: Data not found
 */
app.get("/api/db/data/:id", (req, res) => {
  const id = req.params.id?.trim();
  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  const data = getDataById.get(id);
  if (!data) {
    res.status(404).json({ error: "Data not found" });
    return;
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`SQLite DB server running on http://localhost:${port}`);
  console.log(`Database file: ${dbPath}`);
});