const { Client } = require('pg');

async function migrate() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'kamron123',
    database: process.env.DB_DATABASE || 'tashkentlaw',
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const checkSql = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'results' AND column_name = 'photos'
    `;
    const res = await client.query(checkSql);

    if (res.rows.length === 0) {
      await client.query(`
        ALTER TABLE results 
        ADD COLUMN photos TEXT;
      `);
      console.log('✓ photos column added to results table');
    } else {
      console.log('○ photos column already exists');
    }

    await client.end();
    console.log('Migration complete');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

migrate();
