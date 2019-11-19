import { Component, OnInit } from '@angular/core';
import { TutorialService, SkillService } from '../../services';
import { Observable } from 'rxjs';
import { Tutorial, Skill } from '../../models';

@Component({
    selector: 'app-admin-tutorial',
    templateUrl: './admin-tutorial.component.html',
    styleUrls: ['./admin-tutorial.component.scss']
})
export class AdminTutorialComponent implements OnInit {

    tutorials: Observable<Tutorial[]>;

    skills: Observable<Skill[]>;

    constructor(
        private tutorialService: TutorialService,
        private skillService: SkillService) {

    }
    ngOnInit() {
        this.tutorials = this.tutorialService.getTutorials();
        this.skills = this.skillService.getSkills();
    }
}
