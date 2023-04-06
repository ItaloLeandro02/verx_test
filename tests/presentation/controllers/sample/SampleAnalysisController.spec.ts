import { HttpRequest } from "@/presentation/protocols";
import { SampleAnalysisSpy, ValidationSpy } from '@/presentation/test';
import { SampleAnalysisController } from '@/presentation/controllers/sample/SampleAnalysisController';
import { InvalidParamError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";

type SutTypes = {
    sut: SampleAnalysisController,
    validation: ValidationSpy,
    sampleAnalysis: SampleAnalysisSpy
};

const makeSut = (): SutTypes => {
    const validation = new ValidationSpy();
    const sampleAnalysis = new SampleAnalysisSpy();
    const sut = new SampleAnalysisController(validation, sampleAnalysis);
    return {
        sut,
        validation,
        sampleAnalysis
    };
};
const makeHttpRequest = (): HttpRequest => {
    return {
        body: {
            codigoAmostra: "02383322",
            cocaina: 0.678,
            anfetamina: 0.1,
            metanfetamina: 0.1,
            mda: 0.1,
            mdma: 0,
            thc: 0.1,
            morfina: 0.1,
            codeina: 0.1,
            heroina: 0.1,
            benzoilecgonina: 0,
            cocaetileno: 0,
            norcocaina: 0
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
    describe('SampleAnalysis', () => {
        it ('Deve chamar SampleAnalysis com os dados corretos', async () => {
            const { sut, sampleAnalysis } = makeSut();
            const httpRequest = makeHttpRequest();
            await sut.handle(httpRequest);
            expect(sampleAnalysis.requestParams).toEqual(httpRequest.body);
        });
        it ('Deve retornar 500 caso SampleAnalysis lance uma exceção', async () => {
            const { sut, sampleAnalysis } = makeSut();
            jest.spyOn(sampleAnalysis, 'analyze').mockImplementationOnce(() => { throw new Error() });
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(serverError(new Error()));
        });
        it ('Deve retornar 200 com o laudo positivo', async () => {
            const { sut, sampleAnalysis } = makeSut();
            sampleAnalysis.analyseResult = "positivo";
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(ok({
                codigoAmostra: sampleAnalysis.requestParams.codigoAmostra,
                result: "positivo"
            }));
        });
        it ('Deve retornar 200 com o laudo negativo', async () => {
            const { sut, sampleAnalysis } = makeSut();
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(ok({
                codigoAmostra: sampleAnalysis.requestParams.codigoAmostra,
                result: "negativo"
            }));
        });
    });
});