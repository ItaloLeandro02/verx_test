import validator from "validator";
import { EmailValidator } from "@/validation/protocols";

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        validator.isEmail(email);
        return true;
    }
}