import { EmailValidatorAdapter } from "@/infra/validators/EmailValidatorAdapter";
import { Validation } from "@/presentation/protocols";
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators";

export const makeValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields: string[] = ['email', 'password'];
    for (const field of requiredFields) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    return new ValidationComposite(validations);
};