const { Client } = require('./node_modules/pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'kamron123',
  database: 'tashkentlaw',
});

async function run() {
  await client.connect();

  const queries = [
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS title_font_size VARCHAR(20) DEFAULT '4.5rem'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS subtitle_font_size VARCHAR(20) DEFAULT '1.125rem'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS description_font_size VARCHAR(20) DEFAULT '1rem'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS title_font_weight VARCHAR(10) DEFAULT '700'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS subtitle_font_weight VARCHAR(10) DEFAULT '400'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS description_font_weight VARCHAR(10) DEFAULT '400'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS text_align VARCHAR(20) DEFAULT 'center'`,
    `ALTER TABLE heroes ADD COLUMN IF NOT EXISTS max_width VARCHAR(20) DEFAULT '100%'`,
  ];

  for (const q of queries) {
    await client.query(q);
    console.log('OK:', q.substring(0, 60));
  }

  console.log('All columns added successfully!');
  await client.end();
}

run().catch((e) => { console.error(e); client.end(); });
