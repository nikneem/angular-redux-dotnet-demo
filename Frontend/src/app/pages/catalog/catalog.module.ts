import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogListPageComponent } from './catalog-list-page/catalog-list-page.component';
import { EffectsModule } from '@ngrx/effects';
import { CatalogEffects } from '@state/catalog/catalog.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogListToolbarComponent } from './catalog-list-toolbar/catalog-list-toolbar.component';
import { FormsModule } from '@angular/forms';
import { CatalogListFiltersComponent } from './catalog-list-filters/catalog-list-filters.component';
import { DeleteConfirmationComponent } from '@components/delete-confirmation/delete-confirmation.component';

@NgModule({
    declarations: [
        CatalogListPageComponent,
        CatalogListToolbarComponent,
        CatalogListFiltersComponent
    ],
    imports: [
        CommonModule,
        CatalogRoutingModule,
        FormsModule,
        SharedModule,
        EffectsModule.forFeature([CatalogEffects])
    ],
    entryComponents: [DeleteConfirmationComponent]
})
export class CatalogModule {}
