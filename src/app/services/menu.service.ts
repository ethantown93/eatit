import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCollection: AngularFirestoreCollection;
  menuItems: Observable<any>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.menuCollection = this.afs.collection('menu-items');
 }

 getMenuItems(){
    this.menuItems = this.menuCollection.snapshotChanges().pipe(map(
      result => {
        return result.map( results => {
          const menuData = results.payload.doc.data();
          return menuData
        });
      }))
      return this.menuItems;
 }

}
