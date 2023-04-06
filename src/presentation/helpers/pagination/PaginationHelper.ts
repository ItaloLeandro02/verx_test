import { Pagination, PaginationInfo, PaginationParams } from "@/presentation/protocols";

export class PaginationHelper implements Pagination {
    LIMIT = {
        MIN: 5,
        MAX: 50
    }
    OFFSET = {
        DEFAULT: 0
    }

    getPaginationInfo (params?: PaginationParams): PaginationInfo {
        const limit = this.normalizeNumberToInteger(params?.limit);
        const offset = this.normalizeNumberToInteger(params?.offset);
        return {
            limit: limit < this.LIMIT.MIN ? this.LIMIT.MIN : (limit > this.LIMIT.MAX ? this.LIMIT.MAX : limit),
            offset: offset || this.OFFSET.DEFAULT
        }
    }

    private normalizeNumberToInteger (value?: string): number {
        if (!value) {
            return 0;
        }
        const valueToint = parseInt(value);
        return Number.isInteger(valueToint) ? valueToint : 0;
    }
}