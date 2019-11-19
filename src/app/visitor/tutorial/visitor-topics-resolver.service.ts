import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Topic } from '../../models';
import { TopicService } from '../../services';
import { Observable } from 'rxjs';

@Injectable()
export class VisitorTopicsResolver implements Resolve<Array<Topic>> {

    constructor(
        private topicService: TopicService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<Topic> {
        return this.topicService.topics;
    }
}

