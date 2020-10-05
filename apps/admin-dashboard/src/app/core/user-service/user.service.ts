import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServerResponse, UserRole } from '@pelaguru/interfaces';
import { User } from '@pelaguru/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private fireStore: AngularFirestore) {}

  addAdmin(name: string, email: string, password: string) {
    const data = {
      name,
      email,
      password,
    };
    return this.http.post<ServerResponse>('/api/auth/admin', data).toPromise();
  }

  addResourcePerson(name: string, email: string, password: string) {
    const data = {
      name,
      email,
      password,
    };
    return this.http
      .post<ServerResponse>('/api/auth/resource-person', data)
      .toPromise();
  }

  addModerator(name: string, email: string, password: string) {
    const data = {
      name,
      email,
      password,
    };
    return this.http
      .post<ServerResponse>('/api/auth/moderator', data)
      .toPromise();
  }

  async getAllUsers(): Promise<User[]> {
    const ref = this.fireStore.collection<User>('Users');
    const data = await ref
      .get()
      .pipe(
        map((snap) => {
          return snap.docs.map((d) => {
            return d.data() as User;
          });
        })
      )
      .toPromise();
    return data;
  }

  async getUsersByRole(role: UserRole) {
    const ref = this.fireStore.firestore
      .collection('Users')
      .where('role', '==', role);
    const data = (await ref.get()).docs.map((d) => {
      return d.data() as User;
    });
    return data;
  }

  async deleteUser(id: string): Promise<ServerResponse> {
    return this.http.delete<ServerResponse>(`/api/auth/${id}`).toPromise();
  }
}
