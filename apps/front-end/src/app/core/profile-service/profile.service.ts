import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private static profileStateObservable: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  constructor() {}

  setProfileState(state: boolean): void {
    ProfileService.profileStateObservable.next(state);
  }

  getNavDraverState(): Observable<boolean> {
    return ProfileService.profileStateObservable.asObservable();
  }
}
