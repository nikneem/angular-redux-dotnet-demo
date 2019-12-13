import { MainNavigationState } from './navigation-main.state';
import { mainNavigationActions } from './navigation-main.actions';

export function MainNavigationReducer(state: MainNavigationState, action: any) {
    {
        switch (action.type) {
            case mainNavigationActions.toggle:
                return { ...state, isCollapsed: !state.isCollapsed };
            case mainNavigationActions.collapse:
                return { ...state, isCollapsed: true };
            case mainNavigationActions.expand:
                return { ...state, isCollapsed: false };

            default:
                return state;
        }
    }
}
