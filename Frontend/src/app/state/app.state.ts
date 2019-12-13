import { routerReducer } from '@ngrx/router-store';
import {
    MainNavigationState,
    INITIAL_MAIN_NAVIGATION_STATE
} from './main-navigation/navigation-main.state';
import { MainNavigationReducer } from './main-navigation/navigation-main.reducer';
import { CatalogState, INITIAL_CATALOG_STATE } from './catalog/catalog.state';
import { CatalogReducer } from './catalog/catalog.reducer';

export interface AppState {
    mainNavigationState: MainNavigationState;
    catalogState: CatalogState;
}

export const INITIAL_APPSTATE: AppState = {
    mainNavigationState: INITIAL_MAIN_NAVIGATION_STATE,
    catalogState: INITIAL_CATALOG_STATE
};

export const reducers = {
    routerReducer,
    mainNavigationState: MainNavigationReducer,
    catalogState: CatalogReducer
};
