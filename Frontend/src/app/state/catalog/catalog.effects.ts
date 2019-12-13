import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
    catalogActions,
    CatalogList,
    CatalogListComplete,
    CatalogFailure,
    CatalogDelete,
    CatalogDeleteComplete
} from './catalog.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { CatalogService } from '@services/catalog.service';

@Injectable()
export class CatalogEffects {
    constructor(
        private actions$: Actions,
        private catalogService: CatalogService,
        private router: Router
    ) {}

    @Effect()
    list$: Observable<Action> = this.actions$.pipe(
        ofType<CatalogList>(catalogActions.list),
        debounceTime(300),
        switchMap(action =>
            this.catalogService.list(action.filter).pipe(
                map(resp => new CatalogListComplete(resp)),
                catchError(error => of(new CatalogFailure(error)))
            )
        )
    );

    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<CatalogDelete>(catalogActions.delete),
        debounceTime(300),
        switchMap(action =>
            this.catalogService.delete(action.itemId).pipe(
                map(resp => new CatalogDeleteComplete(action.itemId)),
                catchError(error => of(new CatalogFailure(error)))
            )
        )
    );
}
