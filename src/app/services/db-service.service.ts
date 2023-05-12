import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../interfaces';
import { map } from 'rxjs/operators';
import { addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}

  getAllUsers() {
    const usersCollection = this.firestore.collection<IUser>('users');
    return usersCollection.valueChanges();
  }

  // getObservableAllUsers() {
  //   const userCollection = this.firestore.collection<IUser>('users');

  //   const observableUsers = userCollection.snapshotChanges().pipe(
  //     map((actions) =>
  //       actions.map((a) => {
  //         const data = a.payload.doc.data() as IUser;
  //         const id = a.payload.doc.id;
  //         return { ...data, id };
  //       })
  //     )
  //   );

  //   return observableUsers;
  // }

  registerUser(user: IUser) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('users')
      .doc(id)
      .set({ id, ...user });
  }
}
