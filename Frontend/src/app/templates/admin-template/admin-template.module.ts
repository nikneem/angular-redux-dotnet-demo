import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AdminTemplateComponent,
        AdminHeaderComponent,
        AdminNavigationComponent,
        AdminNotificationsComponent
    ],
    imports: [CommonModule, MaterialModule, RouterModule, TranslateModule]
})
export class AdminTemplateModule {}
