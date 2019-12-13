import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    exports: [MaterialModule, ReactiveFormsModule, ComponentsModule]
})
export class SharedModule {}
