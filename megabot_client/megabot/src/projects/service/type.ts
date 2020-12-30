export interface DataPageResp {
    startCursor: number;
    totalCount: number;
    totalPage: number;
    currentPage: number;
    returnCount: number;
    visiblePage: number;
    list: Array<any>;
}
