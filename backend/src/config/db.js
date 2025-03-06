const { Pool } = require("pg");
const { env } = require("./env");

const db = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = { db };
