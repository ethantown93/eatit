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

}
