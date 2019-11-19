import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../models';
import { SkillService } from '../../services';

@Component({
  selector: 'app-visitor-tutorial',
  templateUrl: './visitor-tutorial.component.html',
  styleUrls: ['./visitor-tutorial.scss']
})
export class VisitorTutorialComponent implements OnInit {

  skills: Observable<Skill[]>;

  constructor(private skillService: SkillService) {

  }
  ngOnInit() {
    this.skills = this.skillService.getSkills();
  }
}

