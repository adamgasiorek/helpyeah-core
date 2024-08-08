import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {filter, switchMap, take, tap} from "rxjs/operators";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireFunctions} from "@angular/fire/functions";

@Injectable({ providedIn: 'root' })
export class UserAdvancedService {

    constructor(private afAuth: AngularFireAuth,
                private fns: AngularFireFunctions) {
        this.afAuth.languageCode = new Promise(() => 'pl');
    }

    doPasswordLink(data) {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => {
                return user.linkWithCredential(firebase.auth.EmailAuthProvider.credential(data.email, data.password))
            })
    }

    doGoogleLink() {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => {
                return user.linkWithPopup(new firebase.auth.GoogleAuthProvider());
            })
    }

    doFacebookLink() {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => {
                return user.linkWithPopup(new firebase.auth.FacebookAuthProvider());
            })
    }

    doUnlink(data) {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => {
                console.log(user);
                return user.unlink(data.providerId);
            })
    }

    doUpdatePassword(data) {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => {
                return user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, data.oldPassword))
                    .then((res) => {
                        return res.user.updatePassword(data.newPassword);
                    })
            })
    }

    doResetPasswordWithMail(data) {
        return firebase.auth().sendPasswordResetEmail(data.email);
    }

    doConfirmResetPassword(data) {
        return firebase.auth().confirmPasswordReset(data.code, data.newPassword);
    }

    doSendEmailVerification() {
        return this.afAuth.authState.pipe(take(1), filter((x) => x !== null)).toPromise()
            .then((user) => user.sendEmailVerification());
    }

    doVerifyEmail(data) {
        return firebase.auth().applyActionCode(data)
    }

    doAddAdmin(data) {
        return this.fns.httpsCallable('addAdminRole')({email: data.email});
    }

}
