import { Action } from '@ngrx/store';
import { CatalogDetailsDto, CatalogListItemDto } from './catalog.models';
import { ListFilterDto } from 'src/app/shared/models/list-filter.models';

export const catalogActions = {
    init: '[catalog] init',
    setFilter: '[catalog] setFilter',

    select: '[catalog] select',
    selectComplete: '[catalog] selectComplete',

    list: '[catalog] list',
    listComplete: '[catalog] listComplete',

    delete: '[catalog] delete',
    deleteComplete: '[catalog] deleteComplete',

    failure: '[catalog] failure'
};

export class CatalogInit implements Action {
    readonly type = catalogActions.init;
    constructor(public filter: ListFilterDto) {}
}
export class CatalogSetFilter implements Action {
    readonly type = catalogActions.setFilter;
    constructor(public field: string, public value: string) {}
}

export class CatalogSelect implements Action {
    readonly type = catalogActions.select;
    constructor(public employeeId: string) {}
}
export class CatalogSelectComplete implements Action {
    readonly type = catalogActions.selectComplete;
    constructor(public employee: CatalogDetailsDto) {}
}
export class CatalogList implements Action {
    readonly type = catalogActions.list;
    constructor(public filter: ListFilterDto) {}
}
export class CatalogListComplete implements Action {
    readonly type = catalogActions.listComplete;
    constructor(public listItems: Array<CatalogListItemDto>) {}
}

export class CatalogDelete implements Action {
    readonly type = catalogActions.delete;
    constructor(public itemId: string) {}
}
export class CatalogDeleteComplete implements Action {
    readonly type = catalogActions.deleteComplete;
    constructor(public itemId: string) {}
}

export class CatalogFailure implements Action {
    readonly type = catalogActions.failure;
    constructor(public errorMessage: string) {}
}
