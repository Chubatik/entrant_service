import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {Router} from '@angular/router';
import {getAccess} from '../../shared/methods/methods';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  access = false;
  password: string;
  passwordMatch = true;
  constructor(public httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    if (!getAccess()) {
      this.setAccess(false);
    } else {
      this.access = true;
    }
  }

  setAccess(value): void {
    const access = {
      access : value
    };
    localStorage.setItem('access', JSON.stringify(access));
  }

  cancelConfirm(): void {
    this.setAccess(false);
    window.location.reload();
  }
  withoutConfirm(): void {
    this.router.navigate(['/start-page']);
  }
  confirm(): void {
    this.httpService.getAccess(this.password).subscribe(
      (data) => {
        this.setAccess(data);
        this.router.navigate([`/start-page`]);
      }, error => {
        this.passwordMatch = false;
      });
  }

}
