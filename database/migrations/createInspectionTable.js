const db = require("../postgres");

async function createInspectionTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS inspection_records (
      id BIGSERIAL PRIMARY KEY,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      site_id VARCHAR(100) NOT NULL,
      section_id VARCHAR(100),
      camera_id VARCHAR(255) NOT NULL,
      captured_data JSONB,
      event_id VARCHAR(255) NOT NULL UNIQUE,
      event_type VARCHAR(100),
      status VARCHAR(20) NOT NULL,
      evidence_link TEXT,
      comments TEXT,
      remarks TEXT,
      confidence DOUBLE PRECISION,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS inspection_records_timestamp_idx
    ON inspection_records (timestamp DESC);
  `);
}

module.exports = createInspectionTable;
