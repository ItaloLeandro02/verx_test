import { PaginationSpy } from "@/data/test";
import { DbGetHistoricalSamples } from "@/data/usecases/sample/DbGetHistoricalSamples";
import { GetHistoricalSamplesParams } from "@/domain/usercases/sample/GetHistoricalSamples";

type SutTypes = {
    sut: DbGetHistoricalSamples,
    pagination: PaginationSpy
};

const makeSut = (): SutTypes => {
    const pagination = new PaginationSpy();
    const sut = new DbGetHistoricalSamples(pagination);
    return {
        sut,
        pagination
    };
};
const mockInput = (): GetHistoricalSamplesParams => ({
    limit: "10",
    offset: "0"
});

describe('DbGetHistoricalSamples', () => {
    describe('Pagination', () => {
        it ('Deve chamar Pagination com os dados corretos', async () => {
            const { sut, pagination } = makeSut();
            const input = mockInput();
            await sut.getHistorical(input);
            expect(pagination.requestParams).toEqual(input);
        });
        it ('Deve retornar uma exceção caso Pagination falhe', async () => {
            const { sut, pagination } = makeSut();
            jest.spyOn(pagination, 'getPaginationInfo').mockImplementationOnce(() => { throw new Error() });
            const input = mockInput();
            const promise = sut.getHistorical(input);
            await expect(promise).rejects.toThrow();
        });
    });
});