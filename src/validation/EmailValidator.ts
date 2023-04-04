import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class EmailValidator implements Validation {
    validate(input: any): Error {
        return new InvalidParamError('email');
    }
}