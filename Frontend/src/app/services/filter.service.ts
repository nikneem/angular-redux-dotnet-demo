import { Injectable } from '@angular/core';
import {
    ListFilterDto,
    ListFilterValueDto
} from '../shared/models/list-filter.models';
import { Constants } from '../shared/models/constants.models';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor() {}

    constructListFilter(filter: ListFilterDto): string {
        let qs = '';
        if (filter) {
            let splitChar = '?';
            if (filter.filters) {
                _.forEach(filter.filters, (itm: ListFilterValueDto, i) => {
                    if (itm.value) {
                        qs += `${splitChar}${itm.field}=${itm.value}`;
                        splitChar = '&';
                    }
                });
            }
        }
        return qs;
    }
}
