/**
 * Local development only: creates (or resets) a QA admin in the LOCAL database so
 * the admin panel can be tested on http://localhost:3002.
 *
 *   QA_ADMIN_EMAIL=qa-local@tls.test QA_ADMIN_PASSWORD=... npx ts-node scripts/create-local-admin.ts
 *
 * Refuses to run against anything but a localhost database.
 */
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const host = process.env.DB_HOST || 'localhost';
  if (!['localhost', '127.0.0.1', '::1'].includes(host)) {
    throw new Error(`Refusing to run: DB_HOST is "${host}", not localhost.`);
  }
  const email = process.env.QA_ADMIN_EMAIL || 'qa-local@tls.test';
  const password = process.env.QA_ADMIN_PASSWORD;
  if (!password || password.length < 8) throw new Error('Set QA_ADMIN_PASSWORD (8+ chars).');

  const client = new Client({
    host,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  await client.connect();
  const hash = await bcrypt.hash(password, 12);
  await client.query(
    `INSERT INTO admins (id, email, password, full_name, role, "isActive", "createdAt", "updatedAt")
     VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM admins), $1, $2, 'QA Local', 'SUPER_ADMIN', true, now(), now())
     ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, "isActive" = true`,
    [email, hash],
  );
  await client.end();
  console.log(`Local QA admin ready: ${email}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
