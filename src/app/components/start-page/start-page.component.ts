import { Component, OnInit } from '@angular/core';
import {getAccess} from '../../shared/methods/methods';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  title = 'Додавання абітурієнта';
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
