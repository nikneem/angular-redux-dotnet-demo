import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private oidc: OidcSecurityService) {}

    private login() {
        this.oidc.authorize();
    }

    initForm() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.initForm();
        this.login();
    }
}
