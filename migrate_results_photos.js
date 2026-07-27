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

    await client.query(`
      ALTER TABLE results 
      ALTER COLUMN photo TYPE TEXT;
    `);
    console.log('✓ photo column type changed to TEXT');

    await client.end();
    console.log('Migration complete');
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  }
}

migrate();
