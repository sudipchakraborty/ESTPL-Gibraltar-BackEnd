const db = require("../postgres");

async function createUserSessionsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      login_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      logout_time TIMESTAMPTZ,
      session_status VARCHAR(20) NOT NULL DEFAULT 'Active',
      ip_address VARCHAR(45),
      user_agent TEXT
    );
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS user_sessions_user_id_idx
    ON user_sessions (user_id);
  `);
}

module.exports = createUserSessionsTable;
