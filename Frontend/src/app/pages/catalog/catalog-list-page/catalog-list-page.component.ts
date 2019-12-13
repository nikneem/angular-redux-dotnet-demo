import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogListItemDto } from '@state/catalog/catalog.models';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { QuerystringService } from '@services/querystring.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
    ListFilterDto,
    ListFilterValueDto
} from 'src/app/shared/models/list-filter.models';
import {
    CatalogInit,
    CatalogSelect,
    CatalogDelete,
    CatalogList
} from '@state/catalog/catalog.actions';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-catalog-list-page',
    templateUrl: './catalog-list-page.component.html',
    styleUrls: ['./catalog-list-page.component.scss']
})
export class CatalogListPageComponent implements OnInit, OnDestroy {
    private filterChangedSubscription: Subscription;
    private isLoadingSubscription: Subscription;
    private employeesListSubscription: Subscription;
    private paginationSubscription: Subscription;

    isLoading: boolean;
    list: Array<CatalogListItemDto>;

    displayedColumns: string[] = [
        'name',
        'brand',
        'type',
        'size',
        'inStock',
        'deliveryDays',
        'price',
        'actions'
    ];

    constructor(
        private store: Store<AppState>,
        private queryStringService: QuerystringService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    readRouterParams() {
        const params = this.activatedRoute.snapshot.queryParams;
        const query = params.query;
        const brand = params.brand;
        const type = params.type;
        const width = params.width;
        const height = params.height;
        const inch = params.inch;

        const filter = new ListFilterDto();
        filter.filters.push(
            new ListFilterValueDto({ field: 'query', value: query }),
            new ListFilterValueDto({ field: 'brand', value: brand }),
            new ListFilterValueDto({ field: 'type', value: type }),
            new ListFilterValueDto({ field: 'width', value: width }),
            new ListFilterValueDto({ field: 'height', value: height }),
            new ListFilterValueDto({ field: 'inch', value: inch })
        );
        this.store.dispatch(new CatalogInit(filter));
    }

    delete(name: string, catalogId: string) {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            width: '460px',
            data: { name }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(new CatalogDelete(catalogId));
            }
        });
    }

    ngOnInit() {
        this.filterChangedSubscription = this.store
            .select(str => str.catalogState.listFilter)
            .subscribe(val => {
                if (!val) {
                    this.readRouterParams();
                } else {
                    this.store.dispatch(new CatalogList(val));
                    this.queryStringService.setQuerystringParameters(val);
                }
            });
        this.isLoadingSubscription = this.store
            .select(str => str.catalogState.isLoading)
            .subscribe(val => (this.isLoading = val));
        this.employeesListSubscription = this.store
            .select(str => str.catalogState.listItems)
            .subscribe(val => (this.list = val));
    }
    ngOnDestroy() {
        this.filterChangedSubscription.unsubscribe();
        this.isLoadingSubscription.unsubscribe();
        this.employeesListSubscription.unsubscribe();
        this.paginationSubscription.unsubscribe();
    }
}
