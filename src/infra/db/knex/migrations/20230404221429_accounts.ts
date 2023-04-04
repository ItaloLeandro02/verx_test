import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
}
