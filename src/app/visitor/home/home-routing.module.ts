import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VisitorTutorialComponent,
    VisitorTutorialViewComponent, VisitorTutorialContentComponent, VisitorTopicsResolver } from '../tutorial';

const homeRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '',
                component: VisitorTutorialComponent,
            },
            {
                path: 'tutorials/:skill',
                component: VisitorTutorialViewComponent,
                children: [
                    {
                        path: ':slug',
                        component: VisitorTutorialContentComponent
                    }
                ]
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
