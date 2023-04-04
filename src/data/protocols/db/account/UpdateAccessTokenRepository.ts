export interface UpdateAccessTokenRepository {
    updateAccessToken (id: number | string, token: string): Promise<void>;
}