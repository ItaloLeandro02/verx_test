export type PaginationInfo = {
    limit: number,
    offset: number
};
export type PaginationParams = {
    limit?: string,
    offset?: string
};

export interface Pagination {
    getPaginationInfo (params?: PaginationParams): PaginationInfo
}