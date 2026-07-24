-- === Hero jadvaliga yangi text styling columnlar ===
-- Serverni o'zida ishga tushiring: sudo -u postgres psql -d tashkentlaw -f migrate_hero.sql

ALTER TABLE heroes ADD COLUMN IF NOT EXISTS title_font_size VARCHAR(20) DEFAULT '4.5rem';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS subtitle_font_size VARCHAR(20) DEFAULT '1.125rem';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS description_font_size VARCHAR(20) DEFAULT '1rem';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS title_font_weight VARCHAR(10) DEFAULT '700';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS subtitle_font_weight VARCHAR(10) DEFAULT '400';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS description_font_weight VARCHAR(10) DEFAULT '400';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS text_align VARCHAR(20) DEFAULT 'center';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS max_width VARCHAR(20) DEFAULT '100%';
