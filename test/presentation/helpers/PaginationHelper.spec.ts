import { PaginationHelper } from "@/presentation/helpers/pagination/PaginationHelper";
import { PaginationParams } from "@/presentation/protocols";

type SutType = {
    sut: PaginationHelper
};

const makeSut = (): SutType => {
    const sut = new PaginationHelper();
    return {
        sut
    };
};

describe('Pagination Helper', () => {
    it ('Deve retornar o valor mínimo para limit e offset caso não tenham sido informados', () => {
        const { sut } = makeSut();
        const paginationInfo = sut.getPaginationInfo();
        expect(paginationInfo).toEqual({
            limit: 5,
            offset: 0
        });
    });
    it ('Deve retornar o valor mínimo para limit', () => {
        const { sut } = makeSut();
        const input = {
            offset: "6"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: 5,
            offset: parseInt(input.offset)
        });
    });
    it ('Deve retornar o valor mínimo para offset', () => {
        const { sut } = makeSut();
        const input = {
            limit: "10"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: parseInt(input.limit),
            offset: 0
        })
    });
});