import { Injectable, EventEmitter } from '@angular/core';
import { Topic } from '../models';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from './common.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TopicService {
    topics: Array<Topic>;

    private topicsSharedSource = new Subject<Array<Topic>>();

    topicsShared$ = this.topicsSharedSource.asObservable();

    topicsCollection: AngularFirestoreCollection<Topic>;
    topicDocument: AngularFirestoreDocument<Topic>;


    constructor(
        private afs: AngularFirestore,
        private commonService: CommonService) {
        this.topicsCollection = this.afs.collection('topics');
    }

    getTopics(): Observable<Array<Topic>> {
        return this.topicsCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getTopic(id: string) {
        return this.afs.doc<Topic>(`topics/${id}`);
    }

    createTopic(inputData: Topic, orderNumber: number) {
        inputData.orderNumber = orderNumber;
        inputData.slug = this.commonService.convertToSlug(inputData.title);
        inputData.updatedOn = new Date();
        return this.topicsCollection.add(inputData);
    }

    updateTopic(id: string, data: Topic) {
        data.slug = this.commonService.convertToSlug(data.title);
        data.updatedOn = new Date();
        return this.getTopic(id).update(data);
    }

    deleteTopic(id: string) {
        return this.getTopic(id).delete();
    }

    getTopicsByTutorialId(tutorialId: string) {
        return this.afs.collection('topics', ref => ref.where('tutorialId', '==', tutorialId)).snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getTopicBySlug(slug: string) {
        return this.afs.collection('topics', ref => ref.where('slug', '==', slug)).valueChanges();
    }
    shareTopics(topics: Array<Topic>) {
        this.topics = topics;
    }

    sharedEmitTopics(topics: Array<Topic>) {
        this.topicsSharedSource.next(topics);
    }

    getTopicsBySkill(skill: string) {
        return this.afs.collection('topics', ref => ref.where('skill', '==', skill).orderBy('orderNumber')).snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

}
