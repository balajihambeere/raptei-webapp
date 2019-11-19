import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardContentComponent } from './admin-dashboard-content.component';
import { AdminSkillComponent, AdminSkillAddComponent } from '../skill';
import { AdminTutorialComponent, AdminTutorialAddComponent, AdminTutorialTopicComponent } from '../tutorial';
import { AdminAuthComponent } from '../auth';
import { AuthGuardService } from '../../services';

export function tutorialsMatch(url: UrlSegment[]) {
    return url.length === 1 && url[0].path.includes('tutorials') ? ({ consumed: url }) : null;
}

const adminDashboardRoutes: Routes = [
    {
        path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: AdminDashboardContentComponent,
            },
            {
                path: 'skills',
                component: AdminSkillComponent,
            },
            {
                path: 'skills/new',
                component: AdminSkillAddComponent,
            },
            {
                path: 'skills/edit/:skillId',
                component: AdminSkillAddComponent,
            },
            {
                path: 'tutorials',
                component: AdminTutorialComponent,
            },
            {
                path: 'tutorials/:skill/topics',
                component: AdminTutorialAddComponent,
            },
            {
                path: 'tutorials/:skill/topics/:count/new',
                component: AdminTutorialTopicComponent,
            },
            {
                path: 'tutorials/:skill/topics/:topicId/edit',
                component: AdminTutorialTopicComponent,
            },
        ]
    },
    {
        path: 'auth/login',
        component: AdminAuthComponent,
    },
    {
        path: 'auth/register',
        component: AdminAuthComponent,
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(adminDashboardRoutes)],
    exports: [RouterModule]
})

export class AdminDashboardRoutingModule { }
