import { HttpRequest } from "@/presentation/protocols";
import { ValidationSpy } from '@/presentation/test/sample';
import { SampleAnalysisController } from '@/presentation/controllers/sample/SampleAnalysisController';
import { InvalidParamError } from "@/presentation/errors";
import { badRequest, serverError } from "@/presentation/helpers/http";

type SutTypes = {
    sut: SampleAnalysisController,
    validation: ValidationSpy
};

const makeSut = (): SutTypes => {
    const validation = new ValidationSpy();
    const sut = new SampleAnalysisController(validation);
    return {
        sut,
        validation
    };
};
const makeHttpRequest = (): HttpRequest => {
    return {
        body: {
            "codigo_amostra": "02383322",
            "Cocaína": 0.678,
            "Anfetamina": 0.1,
            "Metanfetamina": 0.1,
            "MDA": 0.1,
            "MDMA": 0,
            "THC": 0.1,
            "Morfina": 0.1,
            "Codeína": 0.1,
            "Heroína": 0.1,
            "Benzoilecgonina": 0,
            "Cocaetileno": 0,
            "Norcocaína": 0
        }
    }
}

describe('SampleAnalysisController', () => {
    describe('Validation', () => {
        it ('Deve chamar Validation com os dados corretos', async () => {
            const { sut, validation } = makeSut();
            const httpRequest = makeHttpRequest();
            await sut.handle(httpRequest);
            expect(validation.inputParams).toEqual(httpRequest.body);
        });
        it ('Deve retornar 400 caso alguma validação falhe', async () => {
            const { sut, validation } = makeSut();
            jest.spyOn(validation, 'validate').mockImplementationOnce(() => new InvalidParamError('codigo_amostra'));
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(badRequest(new InvalidParamError('codigo_amostra')));
        });
        it ('Deve retornar 500 caso Validation lance uma exceção', async () => {
            const { sut, validation } = makeSut();
            jest.spyOn(validation, 'validate').mockImplementationOnce(() => { throw new Error() });
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(serverError(new Error()));
        });
    });
});