import { Authentication, AuthenticationParams } from "@/domain/usercases";

export class AuthenticationSpy implements Authentication {
    authenticationParams = {} as AuthenticationParams; 
    token: string = 'hash';
    
    async auth(authentication: AuthenticationParams): Promise<string> {
        this.authenticationParams = authentication;
        return Promise.resolve(this.token);
    }
}