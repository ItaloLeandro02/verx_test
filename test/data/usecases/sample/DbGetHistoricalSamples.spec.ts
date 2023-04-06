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
    });
});