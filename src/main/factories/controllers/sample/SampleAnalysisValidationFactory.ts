import { LessThanFieldValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators";
import { Validation } from "@/presentation/protocols";

export const makeSampleAnalysisValidation = (): ValidationComposite => {
    const validations: Validation[] = [];
    validations.push(new RequiredFieldValidation('codigoAmostra'));
    validations.push(new LessThanFieldValidation('codigoAmostra', 8));
    return new ValidationComposite(validations);
};