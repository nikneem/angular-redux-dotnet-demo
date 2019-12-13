import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { RestorePasswordPageComponent } from './restore-password-page/restore-password-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServerNotRespondingPageComponent } from './server-not-responding-page/server-not-responding-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        LoginPageComponent,
        RestorePasswordPageComponent,
        ServerNotRespondingPageComponent
    ],
    imports: [CommonModule, HomeRoutingModule, SharedModule, TranslateModule]
})
export class HomeModule {}
