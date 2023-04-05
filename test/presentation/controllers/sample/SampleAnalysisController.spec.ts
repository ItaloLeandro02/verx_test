import { HttpRequest } from "@/presentation/protocols";
import { ValidationSpy } from '@/presentation/test/sample';
import { SampleAnalysisController } from '@/presentation/controllers/sample/SampleAnalysisController';

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
    });
});