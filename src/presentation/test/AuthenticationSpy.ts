import { Authentication, AuthenticationParams } from "@/domain/usercases";

export class AuthenticationSpy implements Authentication {
    authenticationParams = {} as AuthenticationParams; 
    
    async auth(authentication: AuthenticationParams): Promise<string> {
        this.authenticationParams = authentication;
        return Promise.resolve('hash');
    }
}