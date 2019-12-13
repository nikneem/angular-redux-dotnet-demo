import { CatalogListItemDto } from './catalog.models';
import { ListFilterDto } from 'src/app/shared/models/list-filter.models';

export interface CatalogState {
    listItems: Array<CatalogListItemDto>;
    listFilter: ListFilterDto;

    isLoading: boolean;
    errorMessage: string;
}

export const INITIAL_CATALOG_STATE: CatalogState = {
    listFilter: null,
    listItems: null,
    errorMessage: null,
    isLoading: false
};
