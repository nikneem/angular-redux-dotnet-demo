import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';
import {
    CatalogSelect,
    CatalogSetFilter
} from '@state/catalog/catalog.actions';

@Component({
    selector: 'app-catalog-list-toolbar',
    templateUrl: './catalog-list-toolbar.component.html',
    styleUrls: ['./catalog-list-toolbar.component.scss']
})
export class CatalogListToolbarComponent implements OnInit, OnDestroy {
    public searchSubscription: Subscription;
    public filterValue: string;
    constructor(private store: Store<AppState>) {}

    onQueryChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('query', this.filterValue));
    }

    ngOnInit() {
        this.searchSubscription = this.store
            .select(str => str.catalogState.listFilter)
            .subscribe(val => {
                if (val) {
                    const queryValue = val.filters.find(
                        elm => elm.field === 'query'
                    );
                    this.filterValue = queryValue.value;
                } else {
                    this.filterValue = '';
                }
            });
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
}
