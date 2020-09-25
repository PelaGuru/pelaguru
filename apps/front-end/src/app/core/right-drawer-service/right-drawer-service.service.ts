import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RightDrawerServiceService {
  private static navDrawerStateObservable: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  constructor() {}

  setNavDrawerState(state: boolean): void {
    RightDrawerServiceService.navDrawerStateObservable.next(state);
  }

  getNavDraverState(): Observable<boolean> {
    return RightDrawerServiceService.navDrawerStateObservable.asObservable();
  }
}
