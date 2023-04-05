import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('samples', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('codigoAmostra', 30).notNullable();
        table.decimal('cocaina', null, 3).notNullable();
        table.decimal('anfetamina', null, 3).notNullable();
        table.decimal('metanfetamina', null, 3).notNullable();
        table.decimal('mda', null, 3).notNullable();
        table.decimal('mdma', null, 3).notNullable();
        table.decimal('thc', null, 3).notNullable();
        table.decimal('morfina', null, 3).notNullable();
        table.decimal('codeina', null, 3).notNullable();
        table.decimal('heroina', null, 3).notNullable();
        table.decimal('benzoilecgonina', null, 3).notNullable();
        table.decimal('cocaetileno', null, 3).notNullable();
        table.decimal('norcocaina', null, 3).notNullable();
        table.enum('result', ['positivo', 'negativo']).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('samples');
}
