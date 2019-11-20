import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicService } from '../../services';
import { Topic } from '../../models';
import marked from 'marked';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';

import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-visitor-content-tutorial',
    templateUrl: './visitor-tutorial-content.component.html',
    styleUrls: ['./visitor-tutorial.scss']
})
export class VisitorTutorialContentComponent implements OnInit, OnDestroy {
    topic: Topic;
    markedContent: string;
    topicsCollection: Array<Topic>;
    previousTopic: Topic;
    nextTopic: Topic;
    skill: string;
    subscription: Subscription;
    constructor(
        private topicService: TopicService,
        private route: ActivatedRoute,
        private router: Router,
        public meta: Meta,
        public titleService: Title) {

    }
    ngOnInit() {
        const urlArray = this.router.url.split('/');

        if (urlArray instanceof Array) {
            this.skill = urlArray[2];
        }

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        const keySlug = 'slug';
        this.route.params.subscribe(params => {

            if (params[keySlug]) {
                this.topicService.getTopicBySlug(params[keySlug], this.skill).subscribe(item => {
                    if (item instanceof Array) {
                        this.topic = item[0];
                        this.markedContent = marked(this.topic.content);
                        const keywords: MetaDefinition = {
                            name: 'keywords',
                            content: this.topic.keywords
                        };
                        const description: MetaDefinition = {
                            name: 'description',
                            content: this.topic.metaDescription
                        };
                        const author: MetaDefinition = {
                            name: 'author',
                            content: 'www.raptei.com'
                        };
                        this.meta.updateTag(description);
                        this.meta.updateTag(keywords);
                        this.meta.updateTag(author);
                        this.titleService.setTitle(`${this.topic.skill} ${this.topic.title}`);
                    }
                });

                if (this.topicService.topics instanceof Array) {
                    const currentIndex = _.findIndex(this.topicService.topics, { slug: params[keySlug], skill: this.skill });
                    this.previousTopic = this.topicService.topics[currentIndex - 1];
                    this.nextTopic = this.topicService.topics[currentIndex + 1];
                } else {
                    this.subscription = this.topicService.topicsShared$.subscribe(collection => {
                        const currentIndex = _.findIndex(collection, { slug: params[keySlug], skill: this.skill });
                        this.previousTopic = collection[currentIndex - 1];
                        this.nextTopic = collection[currentIndex + 1];
                    });
                }
            }
        });

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.topicService.topics) {
            this.topicService.topics = [];
        }
    }
}
