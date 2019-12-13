import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { CatalogSetFilter } from '@state/catalog/catalog.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-catalog-list-filters',
    templateUrl: './catalog-list-filters.component.html',
    styleUrls: ['./catalog-list-filters.component.scss']
})
export class CatalogListFiltersComponent implements OnInit, OnDestroy {
    public searchSubscription: Subscription;
    public brand: string;
    public type: string;
    public width: string;
    public height: string;
    public inch: string;

    constructor(private store: Store<AppState>) {}

    onBrandChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('brand', this.brand));
    }
    onTypeChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('type', this.type));
    }
    onWidthChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('width', this.width));
    }
    onHeightChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('height', this.height));
    }
    onInchChanged(event: any) {
        this.store.dispatch(new CatalogSetFilter('inch', this.inch));
    }

    ngOnInit() {
        this.searchSubscription = this.store
            .select(str => str.catalogState.listFilter)
            .subscribe(val => {
                if (val) {
                    val.filters.forEach((elm, i) => {
                        if (elm.field === 'brand') {
                            this.brand = elm.value;
                        }
                        if (elm.field === 'type') {
                            this.type = elm.value;
                        }
                        if (elm.field === 'width') {
                            this.width = elm.value;
                        }
                        if (elm.field === 'height') {
                            this.height = elm.value;
                        }
                        if (elm.field === 'inch') {
                            this.inch = elm.value;
                        }
                    });
                } else {
                    this.brand = '';
                    this.type = '';
                    this.width = '';
                    this.height = '';
                    this.inch = '';
                }
            });
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
}
