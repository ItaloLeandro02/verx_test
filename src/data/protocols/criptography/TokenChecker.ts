export interface TokenChecker {
    verify (token: string): Promise<boolean>;
}