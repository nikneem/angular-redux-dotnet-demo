import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

/* NGRX / Redux */
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullPageTemplateModule } from '@templates/full-page-template/full-page-template.module';
import { AdminTemplateModule } from '@templates/admin-template/admin-template.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { reducers, INITIAL_APPSTATE } from '@state/app.state';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CatalogModule } from '@pages/catalog/catalog.module';

let metaReducers = [];
if (environment.production === false) {
    metaReducers = [storeFreeze];
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/translations/');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FullPageTemplateModule,
        AdminTemplateModule,
        BrowserAnimationsModule,
        CatalogModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            initialState: INITIAL_APPSTATE
        }),
        StoreDevtoolsModule.instrument({ maxAge: 5 }),
        EffectsModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
