import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-restore-password-page',
    templateUrl: './restore-password-page.component.html',
    styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {
    restoreForm: FormGroup;
    constructor() {}

    initForm() {
        this.restoreForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    ngOnInit() {
        this.initForm();
    }
}
