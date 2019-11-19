import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../models';
import { SkillService } from '../../services';

@Component({
    selector: 'app-admin-skill',
    templateUrl: './admin-skill.component.html',
    styleUrls: ['./admin-skill.component.scss']
})
export class AdminSkillComponent implements OnInit {

    skills: Observable<Skill[]>;

    constructor(public skillService: SkillService) {
    }

    ngOnInit() {
        this.skills = this.skillService.getSkills();
    }
}
