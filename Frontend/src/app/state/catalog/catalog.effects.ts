import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
    catalogActions,
    CatalogList,
    CatalogListComplete,
    CatalogFailure
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

    // @Effect()
    // select$: Observable<Action> = this.actions$.pipe(
    //     ofType<EmployeesSelect>(employeesActions.select),
    //     debounceTime(300),
    //     switchMap(action =>
    //         this.catalogService.details(action.employeeId).pipe(
    //             map(resp => new EmployeesSelectComplete(resp)),
    //             tap(act =>
    //                 this.router.navigate([
    //                     `/employees/details/${action.employeeId}`
    //                 ])
    //             ),
    //             catchError(error => of(new EmployeesFailure(error)))
    //         )
    //     )
    // );

    // @Effect()
    // delete$: Observable<Action> = this.actions$.pipe(
    //     ofType<EmployeeDelete>(employeesActions.delete),
    //     debounceTime(300),
    //     switchMap(action =>
    //         this.catalogService.delete(action.employeeId).pipe(
    //             map(resp => new EmployeeDeleteComplete(action.employeeId)),
    //             catchError(error => of(new EmployeesFailure(error)))
    //         )
    //     )
    // );
}
