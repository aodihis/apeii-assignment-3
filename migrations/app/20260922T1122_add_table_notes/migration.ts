#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5beaa3730da39bd23403a83fff053b15233722caf304bd652b07f557e575772a/contract';
import endContract from '../../snapshots/5beaa3730da39bd23403a83fff053b15233722caf304bd652b07f557e575772a/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d5b3e0e6b3978d0d8d45c98fdf76cd68a45547f2b291b70ea6128d45525110db/contract';
import startContract from '../../snapshots/d5b3e0e6b3978d0d8d45c98fdf76cd68a45547f2b291b70ea6128d45525110db/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'notes',
        columns: [
          col('createdAt', 'timestamp', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('note', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
