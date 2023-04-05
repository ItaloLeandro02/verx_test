import { hash } from 'bcrypt';
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("accounts").del();
    const password = await hash('123345', 12);
    await knex("accounts").insert([
       { id: 1, name: 'Verx', email: 'verx@mail.com.br', password }
    ]);
};
