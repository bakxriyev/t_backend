/**
 * Non-destructive schema sync: adds columns that exist in Sequelize models
 * but are missing in the database. Never drops or alters existing columns.
 * Usage: npx ts-node scripts/add-missing-columns.ts
 */
import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const p = path.join(process.cwd(), '.env');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

async function main() {
  loadEnv();
  const modelsDir = path.join(__dirname, '..', 'src', 'modules');
  const files: string[] = [];
  for (const dir of fs.readdirSync(modelsDir)) {
    const d = path.join(modelsDir, dir);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) if (f.endsWith('.model.ts')) files.push(path.join(d, f));
  }
  const models: any[] = [];
  for (const f of files) {
    const mod = require(f);
    for (const k of Object.keys(mod)) if (typeof mod[k] === 'function') models.push(mod[k]);
  }
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'tashkentlaw',
    models,
    logging: false,
  });
  const qi = sequelize.getQueryInterface();
  let added = 0;
  for (const model of Object.values(sequelize.models)) {
    const table = model.getTableName() as string;
    let existing: Record<string, unknown>;
    try {
      existing = await qi.describeTable(table);
    } catch {
      console.log(`- table ${table} missing (will be created by app sync)`);
      continue;
    }
    const attrs = model.getAttributes();
    for (const [name, attr] of Object.entries(attrs)) {
      const field = (attr as any).field || name;
      if (existing[field]) continue;
      const def: any = { ...(attr as any) };
      delete def.primaryKey; delete def.autoIncrement; delete def.references;
      def.allowNull = true;
      await qi.addColumn(table, field, def);
      console.log(`+ ${table}.${field}`);
      added++;
    }
  }
  console.log(added ? `Done: ${added} column(s) added.` : 'Schema already up to date.');
  await sequelize.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
