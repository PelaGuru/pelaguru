import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavDrawerService {
  private static navDrawerStateObservable: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  constructor() {}

  setNavDrawerState(state: boolean): void {
    NavDrawerService.navDrawerStateObservable.next(state);
  }

  getNavDraverState(): Observable<boolean> {
    return NavDrawerService.navDrawerStateObservable.asObservable();
  }
}
