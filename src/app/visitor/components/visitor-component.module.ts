import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Visitor tutorial components
import { VisitorNavbarComponent } from './visitor-navbar.component';
import { VisitorFooterComponent } from './visitor-footer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        VisitorNavbarComponent,
        VisitorFooterComponent
    ],
    declarations: [
        VisitorNavbarComponent,
        VisitorFooterComponent
    ]
})
export class VisitorComponentModule { }


