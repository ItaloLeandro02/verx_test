import { Validation } from "@/presentation/protocols";

export class ValidationComposite implements Validation {
    constructor(private readonly validations: Validation[]) {}

    validate(input: any): Error | undefined {
        for (const validation of this.validations) {
            return validation.validate(input);
        }
    }
}