import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { filter, map, timeout } from 'rxjs/operators';

@Component({
  selector: 'pelaguru-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  newSellerRequestCount = 0;
  subscriptions: Subscription[] = [];
  profileMenuItems = [{ title: 'Profile' }, { title: 'Logout' }];
  sidenavMenuItems: NbMenuItem[] = [
    { title: 'Dashboard', link: '/dashboard' },
    {
      title: 'Users',
      expanded: true,
      children: [
        {
          title: 'Add user',
          link: '/add-user',
        },
        {
          title: 'All users',
          link: '/all-users',
        },
      ],
    },
    {
      title: 'Sellers',
      children: [
        {
          title: 'Seller Requests',
        },
        {
          title: 'All sellers',
        },
      ],
    },
    {
      title: 'Plants',
      children: [
        {
          title: 'Add plant',
        },
        {
          title: 'All plants',
        },
      ],
    },
    {
      title: 'Diseases',
      children: [
        {
          title: 'Add disease',
        },
        {
          title: 'All diseases',
        },
      ],
    },
    {
      title: 'Chemicals',
      children: [
        {
          title: 'Add chemical',
        },
        {
          title: 'All chemicals',
        },
      ],
    },
    {
      title: 'Messages',
      children: [
        {
          title: 'From sellers',
        },
        {
          title: 'From users',
        },
      ],
    },
    {
      title: 'ML Model',
      children: [
        {
          title: 'Label images',
        },
      ],
    },
  ];

  constructor(private nbMenuService: NbMenuService) {}
  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'profile-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === 'Logout') {
          alert('logout');
        }
      });
  }

  setSellerMenuAsActivated(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Sellers') {
        m.badge = {
          dotMode: true,
          status: 'warning',
        };
      }
    });
  }

  setSellerMenuAsDeactivated(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Sellers') {
        m.badge = undefined;
      }
    });
  }

  sellerRequested(count: number): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Sellers') {
        m.children.forEach((cm) => {
          if (cm.title === 'Seller Requests') {
            cm.badge = {
              text: `${count}`,
              status: 'primary',
            };
          }
        });
      }
    });
  }

  setSellerRequestsReaded(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Sellers') {
        m.children.forEach((cm) => {
          if (cm.title === 'Seller Requests') {
            cm.badge = undefined;
          }
        });
      }
    });
  }

  setMessagesMenuAsActivated(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.badge = {
          dotMode: true,
          status: 'warning',
        };
      }
    });
  }

  setMessagesMenuAsDeactivated(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.badge = undefined;
      }
    });
  }

  userMessaged(count: number): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.children.forEach((cm) => {
          if (cm.title === 'From users') {
            cm.badge = {
              text: `${count}`,
              status: 'primary',
            };
          }
        });
      }
    });
  }

  userMessagesReaded(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.children.forEach((cm) => {
          if (cm.title === 'From users') {
            cm.badge = undefined;
          }
        });
      }
    });
  }

  sellerMessaged(count: number): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.children.forEach((cm) => {
          if (cm.title === 'From sellers') {
            cm.badge = {
              text: `${count}`,
              status: 'primary',
            };
          }
        });
      }
    });
  }

  sellerMessagesReaded(): void {
    this.sidenavMenuItems.forEach((m) => {
      if (m.title === 'Messages') {
        m.children.forEach((cm) => {
          if (cm.title === 'From sellers') {
            cm.badge = undefined;
          }
        });
      }
    });
  }
}
