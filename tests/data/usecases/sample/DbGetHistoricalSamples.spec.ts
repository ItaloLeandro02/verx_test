import { PaginationSpy } from "@/data/test";
import { LoadHistoricalsSampleRepositorySpy } from "@/data/test/LoadHistoricalsSampleRepositorySpy";
import { DbGetHistoricalSamples } from "@/data/usecases/sample/DbGetHistoricalSamples";
import { mockGetHistoricalSamplesParams } from "@/utils/TestHelper";

type SutTypes = {
    sut: DbGetHistoricalSamples,
    pagination: PaginationSpy,
    loadHistoricalsSampleRepository: LoadHistoricalsSampleRepositorySpy
};

const makeSut = (): SutTypes => {
    const pagination = new PaginationSpy();
    const loadHistoricalsSampleRepository = new LoadHistoricalsSampleRepositorySpy();
    const sut = new DbGetHistoricalSamples(pagination, loadHistoricalsSampleRepository);
    return {
        sut,
        pagination,
        loadHistoricalsSampleRepository
    };
};

describe('DbGetHistoricalSamples', () => {
    describe('Pagination', () => {
        it ('Deve chamar Pagination com os dados corretos', async () => {
            const { sut, pagination } = makeSut();
            const input = mockGetHistoricalSamplesParams();
            await sut.getHistorical(input);
            expect(pagination.requestParams).toEqual(input);
        });
        it ('Deve retornar uma exceção caso Pagination falhe', async () => {
            const { sut, pagination } = makeSut();
            jest.spyOn(pagination, 'getPaginationInfo').mockImplementationOnce(() => { throw new Error() });
            const input = mockGetHistoricalSamplesParams();
            const promise = sut.getHistorical(input);
            await expect(promise).rejects.toThrow();
        });
    });
    describe('LoadHistoricalsSampleRepository', () => {
        it ('Deve chamar LoadHistoricalsSampleRepository com os dados corretos', async () => {
            const { sut, loadHistoricalsSampleRepository, pagination } = makeSut();
            const input = mockGetHistoricalSamplesParams();
            await sut.getHistorical(input);
            expect(loadHistoricalsSampleRepository.requestParams).toEqual(pagination.mockResult);
        });
        it ('Deve retornar uma exceção caso LoadHistoricalsSampleRepository falhe', async () => {
            const { sut, loadHistoricalsSampleRepository } = makeSut();
            jest.spyOn(loadHistoricalsSampleRepository, 'loadHistoricals').mockImplementationOnce(() => { throw new Error() });
            const input = mockGetHistoricalSamplesParams();
            const promise = sut.getHistorical(input);
            await expect(promise).rejects.toThrow();
        });
        it ('Deve retornar os históricos de amostra', async () => {
            const { sut, loadHistoricalsSampleRepository } = makeSut();
            const input = mockGetHistoricalSamplesParams();
            const historicals = await sut.getHistorical(input);
            expect(historicals).toEqual(loadHistoricalsSampleRepository.mockHistoricalSample);
        });
        it ('Deve retornar um array vazio', async () => {
            const { sut, loadHistoricalsSampleRepository } = makeSut();
            loadHistoricalsSampleRepository.mockHistoricalSample = [];
            const input = mockGetHistoricalSamplesParams();
            const historicals = await sut.getHistorical(input);
            expect(historicals).toEqual(loadHistoricalsSampleRepository.mockHistoricalSample);
        });
    });
});