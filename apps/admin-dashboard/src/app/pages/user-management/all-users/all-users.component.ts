import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserRole } from '@pelaguru/interfaces';
import { BehaviorSubject, merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from '../../../core/notification-service/notification.service';
import { UserService } from '../../../core/user-service/user.service';

@Component({
  selector: 'pelaguru-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  loading = true;
  users: BehaviorSubject<Partial<User>[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'action'];
  formControl: FormGroup;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.formControl = new FormGroup({
      search: new FormControl(''),
      role: new FormControl('0'),
    });
  }

  ngAfterViewInit(): void {
    this.loading = true;
    merge(
      this.formControl.get('role').valueChanges,
      this.formControl.get('search').valueChanges.pipe(
        map((key) => {
          if (key === '') return 'NON';
          return key;
        })
      )
    )
      .pipe(
        startWith('0'),
        switchMap(async (d) => {
          if (d === '0') {
            return await this.userService.getAllUsers();
          } else if (!isNaN(d)) {
            switch (d) {
              case '1':
                return await this.userService.getUsersByRole(
                  UserRole.NormalUser
                );
              case '2':
                return await this.userService.getUsersByRole(UserRole.Vendor);
              case '3':
                return await this.userService.getUsersByRole(UserRole.Admin);
              case '4':
                return await this.userService.getUsersByRole(
                  UserRole.ResourcePerson
                );
              case '5':
                return await this.userService.getUsersByRole(
                  UserRole.Moderator
                );
              default:
                return await this.userService.getAllUsers();
            }
          } else if (isNaN(d)) {
            return [];
          } else {
            return await this.userService.getAllUsers();
          }
        }),
        catchError((error) => {
          console.log(error);
          return of('');
        })
      )
      .subscribe((response) => {
        this.loading = false;
        this.users.next(response as User[]);
      });
  }

  ngOnInit() {}

  async deleteUser(id: string): Promise<void> {
    this.loading = true;
    this.userService
      .deleteUser(id)
      .then(async () => {
        this.loading = false;
        this.notificationService.create(
          'User successfully deleted.',
          'success',
          'Success'
        );
        await this.geAllUsers();
      })
      .catch((error) => {
        this.loading = false;
        this.notificationService.create(
          'Something went wrong. Try again later.',
          'danger',
          'Error'
        );
      });
  }

  async geAllUsers() {
    this.loading = true;
    this.userService
      .getAllUsers()
      .then((data) => {
        this.loading = false;
        this.users.next(data);
      })
      .catch((error) => {
        this.loading = false;
      });
  }
}
