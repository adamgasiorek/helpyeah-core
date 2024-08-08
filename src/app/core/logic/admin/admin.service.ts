import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {filter, switchMap, take, tap} from "rxjs/operators";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireFunctions} from "@angular/fire/functions";

@Injectable({ providedIn: 'root' })
export class AdminService {

    constructor(private afAuth: AngularFireAuth,
                private fns: AngularFireFunctions,
                private afs: AngularFirestore) {
        this.afAuth.languageCode = new Promise(() => 'pl');
    }

    getAllUsers(token) {
        return this.fns.httpsCallable('getAllUsers')(token).toPromise();
    }

}
