import { PaginationHelper } from "@/presentation/helpers/pagination/PaginationHelper";
import { PaginationParams } from "@/presentation/protocols";
import { faker } from "@faker-js/faker";

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
    it ('Deve retornar o valor mínimo para limit caso não seja passado um número', () => {
        const { sut } = makeSut();
        const input = {
            limit: faker.random.word(),
            offset: "6"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: 5,
            offset: parseInt(input.offset)
        });
    });
    it ('Deve retornar a parte inteira para limit caso seja passado um valor decimal', () => {
        const { sut } = makeSut();
        const input = {
            limit: "10.5",
            offset: "6"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: 10,
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
        });
    });
    it ('Deve retornar o valor mínimo para offset caso não seja passado um número', () => {
        const { sut } = makeSut();
        const input = {
            limit: "20",
            offset: faker.random.word()
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: parseInt(input.limit),
            offset: 0
        });
    });
    it ('Deve retornar a parte inteira para offset caso seja passado um valor decimal', () => {
        const { sut } = makeSut();
        const input = {
            limit: "20",
            offset: "1,99"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: parseInt(input.limit),
            offset: 1
        });
    });
    it ('Deve retornar o valor máximo para limit', () => {
        const { sut } = makeSut();
        const input = {
            limit: "500",
            offset: "6"
        };
        const paginationInfo = sut.getPaginationInfo(input);
        expect(paginationInfo).toEqual({
            limit: 50,
            offset: parseInt(input.offset)
        });
    });
});