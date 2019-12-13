import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FullPageTemplateComponent } from 'src/app/templates/full-page-template/full-page-template/full-page-template.component';
import { RestorePasswordPageComponent } from './restore-password-page/restore-password-page.component';
import { ServerNotRespondingPageComponent } from './server-not-responding-page/server-not-responding-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: FullPageTemplateComponent,
        children: [
            { path: '', component: LoginPageComponent },
            { path: 'restore', component: RestorePasswordPageComponent }
        ]
    },
    {
        path: 'oops',
        component: FullPageTemplateComponent,
        children: [
            { path: 'server-down', component: ServerNotRespondingPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
