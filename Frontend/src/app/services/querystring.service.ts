import { Injectable } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ListFilterDto } from '../shared/models/list-filter.models';

@Injectable({
    providedIn: 'root'
})
export class QuerystringService {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public setQuerystringParameters(listFilter: ListFilterDto) {
        const queryParams: Params = {};
        listFilter.filters.forEach((itm, i) => {
            queryParams[itm.field] = itm.value;
        });

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams
        });
    }
}
