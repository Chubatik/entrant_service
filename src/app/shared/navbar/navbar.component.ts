import { Component, OnInit } from '@angular/core';
import {getAccess} from '../methods/methods';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Авторизація';
  constructor(public router: Router, public toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  goToPage(route): void {
    if (!getAccess()) {
      this.toastrService.warning('У вас немає доступу', this.title);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }
}
