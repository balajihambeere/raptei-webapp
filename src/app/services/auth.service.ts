import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {
    user: Observable<User | null>;
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notify: NotifyService) {
        this.loadUser();
    }

    public loadUser() {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async emailSignUp(email: string, password: string) {
        try {
            const credential = await this.afAuth.auth
                .createUserWithEmailAndPassword(email, password);
            return this.updateUserData(credential.user); // if using firestore
        } catch (error) {
            return this.handleError(error);
        }
    }

    async emailLogin(email: string, password: string) {
        try {
            const credential = await this.afAuth.auth
                .signInWithEmailAndPassword(email, password);
            return this.updateUserData(credential.user);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: Error) {
        console.error(error);
        this.notify.update(error.message, 'error');
    }

    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
            `users/${user.uid}`
        );

        const data: User = {
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || 'nameless user',
            picture: user.picture || ' ',
            createdDate: new Date(),

        };
        return userRef.set(data);
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }
}
