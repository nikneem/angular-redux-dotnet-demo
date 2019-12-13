import { Action } from '@ngrx/store';

export const mainNavigationActions = {
    toggle: '[mainNavigation] toggle',
    collapse: '[mainNavigation] collapse',
    expand: '[mainNavigation] expand',
};

export class MainNavigationToggle implements Action {
    readonly type = mainNavigationActions.toggle;
    constructor() {}
}
export class MainNavigationCollapse implements Action {
    readonly type = mainNavigationActions.collapse;
    constructor() {}
}
export class MainNavigationExpand implements Action {
    readonly type = mainNavigationActions.expand;
    constructor() {}
}
