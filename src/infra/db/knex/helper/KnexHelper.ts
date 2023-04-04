import { Knex, knex } from 'knex';
import { config } from '../../../../../knexfile';

export const KnexHelper = {
    connection: null as unknown as Knex,

    connect (): void {
        const env = process.env.NODE_ENV || 'development';
        this.connection = knex(config[env]);
    },
    async runMigrations (): Promise<void> {
        await this.connection.migrate.latest();
    },
    async roolbackMigrations (): Promise<void> {
        await this.connection.migrate.rollback();
    },
    async runSeeders (): Promise<void> {
        await this.connection.seed.run();
    },
    async deleteData (table: string): Promise<void> {
        await this.connection(table).delete();
    }
}