import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { getRequiredEnv } from "../src/lib/env";

config({ path: ".env.local" });

const pool = new Pool({ connectionString: getRequiredEnv("DATABASE_URL") });
const schemaPath = join(process.cwd(), "src/lib/schema.sql");

async function main() {
  const schema = await readFile(schemaPath, "utf8");

  await pool.query(schema);
  await pool.end();
  console.log("Database initialized.");
}

main().catch(async (error) => {
  await pool.end();
  console.error(error);
  process.exit(1);
});
