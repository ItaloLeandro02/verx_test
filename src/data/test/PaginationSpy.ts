import { Pagination, PaginationInfo, PaginationParams } from "@/presentation/protocols";

export class PaginationSpy implements Pagination {
    requestParams?: PaginationParams;
    mockResult: PaginationInfo = {
        limit: 10,
        offset: 0
    };

    getPaginationInfo(params?: PaginationParams | undefined): PaginationInfo {
        this.requestParams = params;
        return this.mockResult; 
    }
}