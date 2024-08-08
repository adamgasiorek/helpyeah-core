import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {filter, switchMap, take, tap} from "rxjs/operators";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireFunctions} from "@angular/fire/functions";

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private afAuth: AngularFireAuth,
                private fns: AngularFireFunctions) {
        this.afAuth.languageCode = new Promise(() => 'pl');
    }

    doRegister(data) {
        return this.afAuth.createUserWithEmailAndPassword(data.email, data.password);
    }

    doLogin(data) {
        return this.afAuth.signInWithEmailAndPassword(data.email, data.password);
    }

    doFacebookLogin() {
        return this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }

    doGoogleLogin() {
        return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }

    doLogout() {
        return this.afAuth.signOut();
    }

    getCurrentUser() {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null))
    }

    getRedirectResult () {
        return this.afAuth.getRedirectResult();
    }
}
