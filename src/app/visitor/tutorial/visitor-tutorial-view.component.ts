import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicService } from '../../services';
import { Topic } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-visitor-view-tutorial',
    templateUrl: './visitor-tutorial-view.component.html',
    styleUrls: ['./visitor-tutorial.scss']
})
export class VisitorTutorialViewComponent implements OnInit {

    title: string;
    tutorials = [];
    topics: Observable<Topic[]>;
    skill: string;
    constructor(
        private topicService: TopicService,
        private route: ActivatedRoute,
        private router: Router) {

    }
    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        const urlArray = this.router.url.split('/');
        const keySkill = 'skill';
        this.route.params.subscribe(params => {
            if (params[keySkill]) {
                this.title = `${params[keySkill]} tutorial`;
                this.skill = params[keySkill];

                this.topics = this.topicService.getTopicsBySkill(params[keySkill]);

                this.topics.subscribe(collection => {
                    if (collection instanceof Array) {
                        this.topicService.shareTopics(collection);
                        this.topicService.sharedEmitTopics(collection);
                    }
                });
            }
        });
        if (urlArray instanceof Array) {
            if (urlArray[3].includes('intro')) {
                const slug = `${this.skill}-introduction`;
                this.router.navigate(['/tutorials', this.skill, slug]);
            }
        }
    }
}
