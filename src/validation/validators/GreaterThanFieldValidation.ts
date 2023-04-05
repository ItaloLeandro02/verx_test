import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class GreaterThanFieldValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldLength: number
    ) {}

    validate(input: any): Error | undefined {
        const inputFieldTrim = input[this.fieldName]?.toString().trim();
        if (inputFieldTrim.length < this.fieldLength) {
            return new InvalidParamError(this.fieldName);
        }
    }
}