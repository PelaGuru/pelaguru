import * as firebase from 'firebase/app';
import 'firebase/firestore';

export type FirestoreOperation<T> = Omit<Omit<T, 'createdAt'>, 'updatedAt'> & {
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
};
