import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-visitor-navbar',
    templateUrl: './visitor-navbar.component.html'
})
export class VisitorNavbarComponent {

    constructor(private router: Router) { }

    redirect() {
        this.router.navigate(['']);
    }
}
