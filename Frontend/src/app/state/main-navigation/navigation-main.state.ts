import { MainMenuItemDto } from './navigation-main.models';

export interface MainNavigationState {
    menuItems: Array<MainMenuItemDto>;

    isCollapsed: boolean;
    isLoading: boolean;
    errorMessage: string;
}

export const INITIAL_MAIN_NAVIGATION_STATE: MainNavigationState = {
    menuItems: null,
    isLoading: false,
    isCollapsed: false,
    errorMessage: null,
};
