import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TopicService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../../models';

@Component({
    selector: 'app-admin-tutorial-topic',
    templateUrl: './admin-tutorial-topic.component.html',
    styleUrls: ['./admin-tutorial.component.scss']
})
export class AdminTutorialTopicComponent implements OnInit {
    topicId: string;
    skill: string;
    topicForm: FormGroup;
    count: number;
    constructor(
        public topicService: TopicService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit() {
        this.buildForm();
        const keySkill = 'skill';
        const keyCount = 'count';
        const keyTopicId = 'topicId';
        this.route.params.subscribe(params => {

            if (params[keySkill] || params[keyCount]) {
                this.skill = params[keySkill];
                this.count = params[keyCount];
            }
        });

        this.route.params.subscribe(params => {
            if (params[keyTopicId] && params[keySkill]) {
                this.topicId = params[keyTopicId];
                const response = this.topicService.getTopic(this.topicId).valueChanges();
                response.subscribe(item => {
                    this.topicForm.setValue({
                        title: item.title,
                        content: item.content,
                        metaDescription: item.metaDescription ? item.metaDescription : '',
                        keywords: item.keywords ? item.keywords : ''
                    });
                });
            }
        });
    }

    buildForm() {
        this.topicForm = this.fb.group({
            title: ['', [
                Validators.required
            ]],
            content: [null, [
                Validators.required
            ]],
            metaDescription: [''],
            keywords: ['']
        });
    }


    submitForm() {
        let title = 'title';
        const content = 'content';
        const metaDescription = 'metaDescription';
        const keywords = 'keywords';
        title = this.topicForm.value[title];
        const data: Topic = {
            title: title.toLowerCase(),
            content: this.topicForm.value[content],
            metaDescription: this.topicForm.value[metaDescription],
            keywords: this.topicForm.value[keywords],
            skill: this.skill
        };
        if (this.topicId !== undefined && this.topicId) {
            this.topicService.updateTopic(this.topicId, data).then(
                res => {
                    this.router.navigate(['admin/dashboard/tutorials/', this.skill, 'topics']);
                });
        } else {
            this.topicService.createTopic(data, this.count).then(
                res => {
                    this.router.navigate(['admin/dashboard/tutorials/', this.skill, 'topics']);
                });
        }
    }
}
