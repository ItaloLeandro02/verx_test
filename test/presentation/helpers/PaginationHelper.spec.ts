import { PaginationHelper } from "@/presentation/helpers/pagination/PaginationHelper";

type SutType = {
    sut: PaginationHelper
};

const makeSut = (): SutType => {
    const sut = new PaginationHelper();
    return {
        sut
    };
}

describe('Pagination Helper', () => {
    it ('Deve retornar o valor mínimo para limit e offset caso não tenham sido informados', () => {
        const { sut } = makeSut();
        const paginationInfo = sut.getPaginationInfo();
        expect(paginationInfo).toEqual({
            limit: 5,
            offset: 0
        })
    });
});