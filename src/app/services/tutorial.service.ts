import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Tutorial } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class TutorialService {
    tutorialCollection: AngularFirestoreCollection<Tutorial>;
    tutorialDocument: AngularFirestoreDocument<Tutorial>;
    uid: string;
    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private commonService: CommonService) {
        this.tutorialCollection = this.afs.collection('tutorials');
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.uid = user.uid;
            } else {
                this.uid = null;
            }
        });
    }

    getTutorials(): Observable<Array<Tutorial>> {
        return this.tutorialCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getTutorial(id: string) {
        return this.afs.doc<Tutorial>(`tutorials/${id}`);
    }

    createTutorial(inputData: Tutorial) {
        inputData.slug = this.commonService.convertToSlug(inputData.title);
        inputData.updatedOn = new Date();
        inputData.author = 'admin';
        inputData.userId = this.uid;
        return this.tutorialCollection.add(inputData);
    }

    updateTutorial(id: string, data: Tutorial) {
        data.slug = this.commonService.convertToSlug(data.title);
        data.updatedOn = new Date();
        return this.getTutorial(id).update(data);
    }

    deleteCourse(id: string) {
        return this.getTutorial(id).delete();
    }

    getTutorialBySlug(skill: string) {
        return this.afs.collection('tutorials', ref => ref.where('skill', '==', skill)).snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }
}
