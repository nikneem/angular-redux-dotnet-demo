import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPageTemplateComponent } from './full-page-template/full-page-template.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FullPageTemplateComponent],
    imports: [CommonModule, RouterModule],
    exports: [FullPageTemplateComponent],
})
export class FullPageTemplateModule {}
