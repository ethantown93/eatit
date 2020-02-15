import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  cartCollection: AngularFirestoreCollection;
  cartDoc: AngularFirestoreDocument;
  cartItems: Observable<any>;
  cart: Observable<any>;

  menuCollection: AngularFirestoreCollection;
  menuItems: Observable<any>;

  private backToMenu = new Subject<any>();
  backToMenu$ = this.backToMenu.asObservable();

  constructor(
    private afs: AngularFirestore
  ) { 
    this.menuCollection = this.afs.collection('menu-items');
 }

 storeCartItems(cart, uid: string){
   this.afs.collection('cart').doc(uid).set({cart});
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

 getUserCart(uid: string): Observable<any> {
  this.cartDoc = this.afs.doc(`cart/${uid}`)
  this.cart = this.cartDoc.snapshotChanges().pipe(map( action => {
    if(action.payload.exists === false){
      return null;
    } else {
      const cartData = action.payload.data();
      return cartData;
    }
  }));
  return this.cart;
 }

 deleteUserCart(uid: string){
  this.cartDoc = this.afs.doc(`cart/${uid}`);
  this.cartDoc.delete();
 }

 editCart(mealItems){
  this.backToMenu.next(mealItems)
 }

}
