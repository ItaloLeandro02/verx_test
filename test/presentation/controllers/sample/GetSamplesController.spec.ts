import { GetSamplesController } from "@/presentation/controllers/sample/GetSamplesController";
import { HttpRequest } from "@/presentation/protocols";
import { GetHistoricalSamplesSpy } from "@/presentation/test";

type SutTypes = {
    sut: GetSamplesController,
    getHistoricalSamples: GetHistoricalSamplesSpy
};

const makeSut = (): SutTypes => {
    const getHistoricalSamples = new GetHistoricalSamplesSpy();
    const sut = new GetSamplesController(getHistoricalSamples);
    return {
        sut,
        getHistoricalSamples
    };
};
const makeHttpRequest = (): HttpRequest => {
    return {
        params: {
            limit: '10',
            offset: '0'
        }
    }
};

describe('GetSamplesController', () => {
    describe('GetHistoricalSamples', () => {
        it ('Deve chamar GetHistoricalSamples com os dados corretos', async () => {
            const { sut, getHistoricalSamples } = makeSut();
            const httpRequest = makeHttpRequest();
            await sut.handle(httpRequest);
            expect(getHistoricalSamples.requestParams).toEqual(httpRequest.params);
        });
    });
});