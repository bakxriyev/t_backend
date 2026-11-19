import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

/**
 * Idempotent, non-destructive schema fixes applied on every start.
 * `synchronize: true` creates missing tables but never changes existing columns,
 * so columns that were created too short are widened here (VARCHAR → longer VARCHAR
 * never loses data). Each fix only runs when the column is still shorter.
 */
const WIDEN: { table: string; column: string; length: number }[] = [
  { table: 'statistics', column: 'suffix', length: 50 },
  { table: 'timeline_items', column: 'year', length: 50 },
  ...[
    'title_font_size', 'subtitle_font_size', 'description_font_size',
    'title_font_weight', 'subtitle_font_weight', 'description_font_weight',
    'text_align', 'max_width',
  ].map((column) => ({ table: 'heroes', column, length: 50 })),
];

@Injectable()
export class SchemaFixesService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SchemaFixesService.name);

  constructor(private readonly sequelize: Sequelize) {}

  async onApplicationBootstrap() {
    for (const { table, column, length } of WIDEN) {
      try {
        const [rows] = await this.sequelize.query(
          `SELECT character_maximum_length AS len FROM information_schema.columns
           WHERE table_schema = current_schema() AND table_name = :table AND column_name = :column`,
          { replacements: { table, column } },
        );
        const len = (rows as { len: number | null }[])[0]?.len;
        if (len !== undefined && len !== null && len < length) {
          await this.sequelize.query(`ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE VARCHAR(${length})`);
          this.logger.log(`Widened ${table}.${column}: ${len} → ${length}`);
        }
      } catch (e) {
        this.logger.warn(`Schema fix skipped for ${table}.${column}: ${(e as Error).message}`);
      }
    }
  }
}
