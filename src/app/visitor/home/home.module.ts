import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Visitor tutorial routing
import { HomeRoutingModule } from './home-routing.module';

// Visitor tutorial components
import { HomeComponent } from './home.component';

// Visitor components module
import { VisitorComponentModule } from '../components';

import { VisitorTutorialComponent, VisitorTutorialViewComponent,
    VisitorTutorialContentComponent, VisitorTopicsResolver } from '../tutorial';
import { TutorialService } from '../../services';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        NgbCollapseModule,
        HomeRoutingModule,
        VisitorComponentModule
    ],
    declarations: [
        HomeComponent,
        VisitorTutorialComponent,
        VisitorTutorialViewComponent,
        VisitorTutorialContentComponent
    ],
    providers: [TutorialService, VisitorTopicsResolver]
})
export class HomeModule { }


