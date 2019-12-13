export class ListFilterDto {
    public filters: Array<ListFilterValueDto>;

    constructor(init?: Partial<ListFilterDto>) {
        Object.assign(this, init);
        if (!this.filters) {
            this.filters = new Array<ListFilterValueDto>();
        }
    }
}

export class ListFilterValueDto {
    public field: string;
    public value: string;

    constructor(init?: Partial<ListFilterValueDto>) {
        Object.assign(this, init);
    }
}

export class PaginationHeaderDto {
    public page: number;
    public pageSize: number;
    public totalPages: number;
    public totalEntries: number;
    constructor(init?: Partial<PaginationHeaderDto>) {
        Object.assign(this, init);
    }
}
