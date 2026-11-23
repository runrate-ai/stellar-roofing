import { mkdirSync } from 'fs';
import path from 'path';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS team_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    username text NOT NULL UNIQUE,
    role text NOT NULL CHECK (role IN ('admin','caller')),
    password_hash text NOT NULL,
    must_change boolean NOT NULL DEFAULT true,
    active boolean NOT NULL DEFAULT true,
    ghl_user_id text,
    caller_numbers text NOT NULL DEFAULT '',
    hourly_rate numeric(8,2),
    failed_logins integer NOT NULL DEFAULT 0,
    locked_until timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS team_sessions (
    token_hash text PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES team_users(id),
    expires_at timestamptz NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS team_shifts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES team_users(id),
    clock_in timestamptz NOT NULL,
    clock_out timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (clock_out IS NULL OR clock_out > clock_in)
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS team_one_open_shift ON team_shifts (user_id) WHERE clock_out IS NULL`,
  `CREATE INDEX IF NOT EXISTS team_shifts_time ON team_shifts (clock_in)`,
  `CREATE TABLE IF NOT EXISTS team_breaks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    shift_id uuid NOT NULL REFERENCES team_shifts(id),
    start_at timestamptz NOT NULL DEFAULT now(),
    end_at timestamptz
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS team_one_open_break ON team_breaks (shift_id) WHERE end_at IS NULL`,
  `CREATE TABLE IF NOT EXISTS team_edits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    shift_id uuid NOT NULL REFERENCES team_shifts(id),
    editor_id uuid NOT NULL REFERENCES team_users(id),
    reason text NOT NULL,
    before_value jsonb,
    after_value jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS team_fix_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES team_users(id),
    work_day date NOT NULL,
    note text NOT NULL,
    status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','done')),
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
];

async function connect() {
  const url = process.env.DATABASE_URL;
  let run;
  if (url) {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    run = (text, params = []) => sql.query(text, params);
  } else if (process.env.NODE_ENV !== 'production') {
    // Local development only: an embedded Postgres kept in an ignored folder.
    const { PGlite } = await import(/* webpackIgnore: true */ '@electric-sql/pglite');
    const dir = path.join(process.cwd(), 'node_modules/.cache/team-dev-db');
    mkdirSync(dir, { recursive: true });
    const db = new PGlite(dir);
    await db.waitReady;
    run = async (text, params = []) => (await db.query(text, params)).rows;
  } else {
    throw new Error('TEAM_DB_NOT_CONNECTED');
  }
  for (const statement of SCHEMA) await run(statement);
  return run;
}

export async function q(text, params = []) {
  if (!globalThis.__stellarTeamDb) {
    globalThis.__stellarTeamDb = connect().catch((err) => {
      globalThis.__stellarTeamDb = null;
      throw err;
    });
  }
  const run = await globalThis.__stellarTeamDb;
  return run(text, params);
}
