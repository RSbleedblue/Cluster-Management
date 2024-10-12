import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'snapshot_policies';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('policy'); 
      table.string('apply_to_directory'); 
      table.string('schedule_type'); 
      table.string('snapshot_time'); 
      table.json('selected_days'); 
      table.string('deletion_policy'); 
      table.integer('days_after'); 
      table.boolean('lock').defaultTo(false);
      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
