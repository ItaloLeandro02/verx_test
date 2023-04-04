import { Validation } from "@/presentation/protocols";

export class ValidationSpy implements Validation {
    inputParams: any;

    validate(input: any): Error | undefined {
        this.inputParams = input;
        return;
    }
};