import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardComponent } from './admin-dashboard.component';

import { AdminDashboardContentComponent } from './admin-dashboard-content.component';
import { AdminSkillComponent, AdminSkillAddComponent } from '../skill';
import { AdminTutorialComponent, AdminTutorialAddComponent, AdminTutorialTopicComponent } from '../tutorial';
import { AdminAuthComponent } from '../auth';
import { AuthService, NotifyService, SkillService, CommonService, TutorialService, TopicService, AuthGuardService } from '../../services';

import { NgbCollapseModule, NgbDropdownModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AdminDashboardRoutingModule,
        NgbDropdownModule,
        NgbCollapseModule,
        NgbTabsetModule
    ],
    declarations: [
        AdminDashboardComponent,
        AdminDashboardContentComponent,
        AdminSkillComponent,
        AdminSkillAddComponent,
        AdminTutorialComponent,
        AdminTutorialAddComponent,
        AdminTutorialTopicComponent,
        AdminAuthComponent
    ],
    providers: [AuthService, NotifyService, SkillService, TutorialService,
        CommonService, TopicService, AuthGuardService]
})
export class AdminDashboardModule { }


