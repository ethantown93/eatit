import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users } from '../models/Users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection<Users>;
  usersDoc: AngularFirestoreDocument<Users>;
  users: Observable<Users[]>;
  user: Observable<Users>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection('users');
   }

   getUsers(): Observable<Users[]>{
    this.users = this.usersCollection.snapshotChanges().pipe(map( result => {
      return result.map( results => {
        const data = results.payload.doc.data() as Users;
        data.id = results.payload.doc.id;
        return data
      });
    }));
    return this.users;
   }

   getUser(userId: string): Observable<Users>{
     this.usersDoc = this.afs.doc<Users>(`users/${userId}`)
     this.user = this.usersDoc.snapshotChanges().pipe(map( action => {
       if(action.payload.exists === false){
         return null
       } else {
         const data = action.payload.data() as Users;
         return data;
       }
     }));
     console.log(this.user);
     return this.user;
   }

   updateUserInfo(user, id){
     this.usersDoc = this.afs.doc(`users/${id}`);
     console.log(this.usersDoc)
     this.usersDoc.update(user)
   }

}
