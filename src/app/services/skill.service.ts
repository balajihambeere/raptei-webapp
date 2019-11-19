import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Skill } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class SkillService {
    skillsCollection: AngularFirestoreCollection<Skill>;
    skillDocument: AngularFirestoreDocument<Skill>;
    uid: string;
    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth) {
        this.skillsCollection = this.afs.collection('skills');
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.uid = user.uid;
            } else {
                this.uid = null;
            }
        });
    }


    getSkills(): Observable<Array<Skill>> {
        return this.skillsCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getSkill(id: string) {
        return this.afs.doc<Skill>(`skills/${id}`);
    }

    createSkill(data: Skill) {
        data.createdDate = new Date();
        data.createdBy = 'admin';
        data.userId = this.uid;
        return this.skillsCollection.add(data);
    }

    updateSkill(id: string, data: any) {
        return this.getSkill(id).update(data);
    }
}
