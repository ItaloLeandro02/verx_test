import { MissingParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class RequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error | undefined {
        return new MissingParamError(this.fieldName);
    }
}