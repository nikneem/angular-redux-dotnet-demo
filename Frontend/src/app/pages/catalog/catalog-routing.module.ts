import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { catalogActions } from '@state/catalog/catalog.actions';
import { AdminTemplateComponent } from '@templates/admin-template/admin-template/admin-template.component';
import { CatalogListPageComponent } from './catalog-list-page/catalog-list-page.component';

const routes: Routes = [
    {
        path: 'catalog',
        component: AdminTemplateComponent,
        children: [{ path: '', component: CatalogListPageComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule {}
