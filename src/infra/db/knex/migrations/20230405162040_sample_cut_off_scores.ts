import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sample_cut_off_scores', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.decimal('cocaina').notNullable();
        table.decimal('anfetamina').notNullable();
        table.decimal('metanfetamina').notNullable();
        table.decimal('mda').notNullable();
        table.decimal('mdma').notNullable();
        table.decimal('thc').notNullable();
        table.decimal('morfina').notNullable();
        table.decimal('codeina').notNullable();
        table.decimal('heroina').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sample_cut_off_scores');
}
