import { Pagination, PaginationInfo, PaginationParams } from "@/presentation/protocols";

export class PaginationHelper implements Pagination {
    LIMIT = {
        MIN: 5,
        MAX: 50
    }
    OFFSET = {
        DEFAULT: 0
    }

    getPaginationInfo(params?: PaginationParams): PaginationInfo {
        return {
            limit: this.LIMIT.MIN,
            offset: params?.offset ? parseInt(params.offset) : this.OFFSET.DEFAULT
        }
    }
}