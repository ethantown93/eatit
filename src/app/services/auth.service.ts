import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {}

  loggedIn: AngularFirestoreCollection;
  logIn: Observable<any>;
  loggedOut: AngularFirestoreCollection;
  logOut: Observable<any>;
  userUID: string;

  //update navigation subject
  private updateNav = new Subject<any>();
  updateNavBar$ = this.updateNav.asObservable();

  // user has registered subject
  private userRegistered = new Subject<any>();
  userRegister$ = this.userRegistered.asObservable();

  login(email: string, password: string ) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then( userData => resolve(userData),
      err => reject(err))
    });
  }

  onRegister(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData),
      err => reject(err))
    });
  }

  userPersonalInfoRegister(data){
    let user = localStorage.getItem('UID')
    this.afs.collection('users').doc(user).set(data);
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  updateNavbar(userData){
    this.updateNav.next(userData);
  }

  userHasRegistered(hasRegistered){
    this.userRegistered.next(hasRegistered);
  }

}
