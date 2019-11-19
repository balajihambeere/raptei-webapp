import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../../models';

@Component({
    selector: 'app-admin-skill-add',
    templateUrl: './admin-skill-add.component.html',
    styleUrls: ['./admin-skill.component.scss']
})
export class AdminSkillAddComponent implements OnInit {
    skillForm: FormGroup;
    skillId: string;

    constructor(
        public skillService: SkillService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.buildForm();
        this.route.params.subscribe(params => {
            const key = 'skillId';
            if (params[key]) {
                this.skillId = params[key];
                const response = this.skillService.getSkill(this.skillId).valueChanges();
                response.subscribe(item => {
                    this.skillForm.setValue({
                        name: item.name,
                        skillColor: item.skillColor,
                    });
                });
            }
        });
    }


    submitForm() {
        const name = 'name';
        const skillColor = 'skillColor';
        const data: Skill = {
            name: this.skillForm.value[name],
            skillColor: this.skillForm.value[skillColor]
        };
        if (this.skillId) {
            this.skillService.updateSkill(this.skillId, data).then(result => {
                this.router.navigate(['admin/dashboard/skills']);
            });
        } else {
            this.skillService.createSkill(data).then(result => {
                this.router.navigate(['admin/dashboard/skills']);
            });
        }
    }

    buildForm() {
        this.skillForm = this.fb.group({
            name: ['', [
                Validators.required
            ]],
            skillColor: ['', [
                Validators.required
            ]],
        });
    }
}
