import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../models';
import { SkillService } from '../../services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-visitor-tutorial',
  templateUrl: './visitor-tutorial.component.html',
  styleUrls: ['./visitor-tutorial.scss']
})
export class VisitorTutorialComponent implements OnInit {

  skills: Observable<Skill[]>;

  constructor(
    private skillService: SkillService,
    private router: Router) {

  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.skills = this.skillService.getSkills();
  }

  redirect(skillName: string) {
    const slug = `${skillName}-introduction`;
    this.router.navigate(['/tutorials', skillName, slug.toLowerCase()]);
  }
}

