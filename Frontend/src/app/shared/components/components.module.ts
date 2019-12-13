import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';

@NgModule({
    declarations: [
        LoadingComponent,
        DeleteConfirmationComponent,
        ProgressIndicatorComponent
    ],
    imports: [CommonModule, MaterialModule, TranslateModule],
    exports: [LoadingComponent, ProgressIndicatorComponent]
})
export class ComponentsModule {}
