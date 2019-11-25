import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TopicService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic } from '../../models';

@Component({
    selector: 'app-admin-tutorial-add',
    templateUrl: './admin-tutorial-add.component.html',
    styleUrls: ['./admin-tutorial.component.scss']
})
export class AdminTutorialAddComponent implements OnInit {
    skill: string;
    topics: Observable<Array<Topic>>;
    tutorialState = true;
    topicsState = true;
    totalCount = 0;

    constructor(
        public topicService: TopicService,
        private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef) {
    }
    ngOnInit() {
        if (this.router.url.includes('topics')) {
            this.topicsState = false;
        } else {
            this.tutorialState = false;
        }

        this.route.params.subscribe(params => {
            if (params.skill) {
                this.skill = params.skill;
                this.topics = this.topicService.getTopicsBySkill(params.skill);
                this.topics.subscribe(collection => {
                    if (collection instanceof Array) {
                        this.totalCount = collection.length;
                    }
                });
            }
        });
    }
}
