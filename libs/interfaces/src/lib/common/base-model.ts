import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface BaseModel {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
