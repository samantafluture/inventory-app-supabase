import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items!: NbMenuItem[];
  user!: User;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createMenu();
  }

  createMenu() {
    this.items = [
      {
        title: 'Home',
        icon: 'home-outline',
        link: 'home',
      },
      {
        title: 'Stock Turnover',
        icon: 'calendar-outline',
        link: 'stock-turnover',
      },
      {
        title: 'Products',
        icon: 'shopping-cart-outline',
        link: 'products',
      },
      {
        title: 'Category',
        icon: 'car-outline',
        link: 'category',
      },
      {
        title: 'Logout',
        icon: 'person-remove-outline',
        link: '',
      },
    ];
  }
}
