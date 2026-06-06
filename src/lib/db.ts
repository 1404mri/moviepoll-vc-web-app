import "server-only";

import { neon } from "@neondatabase/serverless";
import { getRequiredEnv } from "@/lib/env";

export type PollSettings = {
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Ballot = {
  id: number;
  voterId: string;
  displayName: string;
  ranking: string[];
  createdAt: Date;
  updatedAt: Date;
};

let cachedSql: ReturnType<typeof neon> | null = null;

function getSql() {
  cachedSql ??= neon(getRequiredEnv("DATABASE_URL"));
  return cachedSql;
}

type SettingsRow = {
  is_closed: boolean;
  created_at: Date;
  updated_at: Date;
};

type BallotRow = {
  id: number;
  voter_id: string;
  display_name: string;
  ranking: string[];
  created_at: Date;
  updated_at: Date;
};

function asRows<T>(rows: unknown) {
  return rows as T[];
}

function mapSettings(row: SettingsRow): PollSettings {
  return {
    isClosed: row.is_closed,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapBallot(row: BallotRow): Ballot {
  return {
    id: row.id,
    voterId: row.voter_id,
    displayName: row.display_name,
    ranking: row.ranking,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function ensurePollSettings() {
  const sql = getSql();
  const rows = asRows<SettingsRow>(await sql`
    insert into poll_settings (id, is_closed)
    values (1, false)
    on conflict (id) do update set id = excluded.id
    returning is_closed, created_at, updated_at
  `);

  return mapSettings(rows[0] as SettingsRow);
}

export async function getPollSettings() {
  const sql = getSql();
  const rows = asRows<SettingsRow>(await sql`
    select is_closed, created_at, updated_at
    from poll_settings
    where id = 1
  `);

  if (!rows[0]) {
    return ensurePollSettings();
  }

  return mapSettings(rows[0] as SettingsRow);
}

export async function setPollClosed(isClosed: boolean) {
  const sql = getSql();
  const rows = asRows<SettingsRow>(await sql`
    insert into poll_settings (id, is_closed)
    values (1, ${isClosed})
    on conflict (id) do update
      set is_closed = excluded.is_closed,
          updated_at = now()
    returning is_closed, created_at, updated_at
  `);

  return mapSettings(rows[0] as SettingsRow);
}

export async function getBallots() {
  const sql = getSql();
  const rows = asRows<BallotRow>(await sql`
    select id, voter_id, display_name, ranking, created_at, updated_at
    from ballots
    order by created_at asc
  `);

  return rows.map(mapBallot);
}

export async function countBallots() {
  const sql = getSql();
  const rows = asRows<{ count: number }>(await sql`select count(*)::int as count from ballots`);
  return Number(rows[0]?.count ?? 0);
}

export async function getBallotByVoterId(voterId: string) {
  const sql = getSql();
  const rows = asRows<BallotRow>(await sql`
    select id, voter_id, display_name, ranking, created_at, updated_at
    from ballots
    where voter_id = ${voterId}
    limit 1
  `);

  return rows[0] ? mapBallot(rows[0] as BallotRow) : null;
}

export async function findBallotByDisplayName(displayName: string) {
  const sql = getSql();
  const rows = asRows<BallotRow>(await sql`
    select id, voter_id, display_name, ranking, created_at, updated_at
    from ballots
    where lower(display_name) = lower(${displayName})
    limit 1
  `);

  return rows[0] ? mapBallot(rows[0] as BallotRow) : null;
}

export async function upsertBallot(voterId: string, displayName: string, ranking: string[]) {
  const sql = getSql();
  const rows = asRows<BallotRow>(await sql`
    insert into ballots (voter_id, display_name, ranking)
    values (${voterId}, ${displayName}, ${ranking}::text[])
    on conflict (voter_id) do update
      set display_name = excluded.display_name,
          ranking = excluded.ranking,
          updated_at = now()
    returning id, voter_id, display_name, ranking, created_at, updated_at
  `);

  return mapBallot(rows[0] as BallotRow);
}
