import * as _ from 'lodash';
import { CatalogState } from './catalog.state';
import {
    catalogActions,
    CatalogSetFilter,
    CatalogList,
    CatalogListComplete,
    CatalogDeleteComplete
} from './catalog.actions';
import {
    ListFilterDto,
    ListFilterValueDto
} from 'src/app/shared/models/list-filter.models';
import { CatalogListItemDto } from './catalog.models';

export function CatalogReducer(state: CatalogState, action: any) {
    {
        switch (action.type) {
            case catalogActions.init:
                return { ...state, listFilter: action.filter };
            case catalogActions.select:
                return {
                    ...state,
                    selectedEmployeeId: action.employeeId,
                    isLoading: true
                };
            case catalogActions.selectComplete:
                return {
                    ...state,
                    selectedEmployee: action.employee,
                    isLoading: false
                };

            case catalogActions.setFilter:
                return setFilterHandler(state, action);
            case catalogActions.list:
            case catalogActions.delete:
                return { ...state, errorMessage: null, isLoading: true };
            case catalogActions.listComplete:
                return listCompleteHandler(state, action);
            case catalogActions.deleteComplete:
                return deleteCompleteHandler(state, action);
            case catalogActions.failure:
                return {
                    ...state,
                    errorMessage: action.errorMessage,
                    isLoading: false
                };

            default:
                return state;
        }
    }
}

function setFilterHandler(
    state: CatalogState,
    action: CatalogSetFilter
): CatalogState {
    const targetState: CatalogState = Object.assign({}, state);
    const listFilter = _.cloneDeep(targetState.listFilter) as ListFilterDto;
    const existingFieldFilter = listFilter.filters.find(
        flt => flt.field === action.field
    );
    if (existingFieldFilter) {
        if (action.value) {
            existingFieldFilter.value = action.value;
        } else {
            const itemIndex = listFilter.filters.indexOf(existingFieldFilter);
            listFilter.filters.splice(itemIndex, 1);
        }
    } else {
        const newFilter = new ListFilterValueDto({
            field: action.field,
            value: action.value
        });
        listFilter.filters.push(newFilter);
    }
    targetState.listFilter = listFilter;
    return targetState;
}
function listCompleteHandler(
    state: CatalogState,
    action: CatalogListComplete
): CatalogState {
    const targetState: CatalogState = Object.assign({}, state);
    targetState.isLoading = false;
    targetState.errorMessage = null;
    targetState.listItems = action.listItems;
    return targetState;
}

function deleteCompleteHandler(
    state: CatalogState,
    action: CatalogDeleteComplete
): CatalogState {
    const targetState: CatalogState = Object.assign({}, state);

    const catalogsList = _.cloneDeep(targetState.listItems) as Array<
        CatalogListItemDto
    >;
    if (catalogsList) {
        const catalog = _.find(catalogsList, {
            employeeId: action.employeeId
        });
        if (catalog) {
            const itemIndex = catalogsList.indexOf(catalog);
            if (itemIndex >= 0) {
                catalogsList.splice(itemIndex, 1);
            }
        }
    }
    targetState.listItems = catalogsList;
    return targetState;
}
