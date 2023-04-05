import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("sample_cut_off_scores").del();

    await knex("sample_cut_off_scores").insert([
        { 
            id: 1, 
            cocaina: 0.5,
            anfetamina: 0.2,
            metanfetamina: 0.2,
            mda: 0.2,
            mdma: 0.2,
            thc: 0.05,
            morfina: 0.2,
            codeina: 0.2,
            heroina: 0.2   
        }
    ]);
};
