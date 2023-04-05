import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class GreaterThanFieldValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldLength: number
    ) {}

    validate(input: any): Error | undefined {
        return new InvalidParamError(this.fieldName);
    }
}