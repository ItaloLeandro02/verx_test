import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("accounts").del();

    await knex("accounts").insert([
       { id: 1, name: 'Verx', email: 'verx@mail.com.br', password: '123345' }
    ]);
};
