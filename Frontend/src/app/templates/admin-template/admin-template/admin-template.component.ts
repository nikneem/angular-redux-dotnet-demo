import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';
import { MainNavigationToggle } from '@state/main-navigation/navigation-main.actions';

@Component({
    selector: 'app-admin-template',
    templateUrl: './admin-template.component.html',
    styleUrls: ['./admin-template.component.scss'],
})
export class AdminTemplateComponent implements OnInit, OnDestroy {
    navigationCollapsed: boolean;
    private menuCollapseSubscription: Subscription;

    constructor(private store: Store<AppState>) {}

    toggleNavigation() {
        this.store.dispatch(new MainNavigationToggle());
    }

    ngOnInit() {
        this.menuCollapseSubscription = this.store
            .select(str => str.mainNavigationState.isCollapsed)
            .subscribe(val => (this.navigationCollapsed = val));
    }
    ngOnDestroy() {
        this.menuCollapseSubscription.unsubscribe();
    }
}
