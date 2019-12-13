import { Injectable } from '@angular/core';
import {
    CatalogListItemDto,
    CatalogDetailsDto
} from '@state/catalog/catalog.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterService } from './filter.service';
import { HttpClient } from '@angular/common/http';
import { ListFilterDto } from '../shared/models/list-filter.models';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private backendUrl: string;

    constructor(
        private http: HttpClient,
        private filterService: FilterService
    ) {
        this.backendUrl = environment.backendUrl;
    }

    public list(filter?: ListFilterDto): Observable<Array<CatalogListItemDto>> {
        const qs = this.filterService.constructListFilter(filter);
        const url = `${this.backendUrl}/api/catalog${qs}`;
        return this.http.get<Array<CatalogListItemDto>>(url);
    }
    public details(id: string): Observable<CatalogDetailsDto> {
        const url = `${this.backendUrl}/api/catalog/${id}`;
        return this.http.get<CatalogDetailsDto>(url);
    }
    public delete(id: string): Observable<boolean> {
        const url = `${this.backendUrl}/api/catalog/${id}`;
        return this.http.delete<boolean>(url);
    }
}
