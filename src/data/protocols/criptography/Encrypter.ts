export interface Encrypter {
    encrypt (plainValue: string): Promise<string>;
}