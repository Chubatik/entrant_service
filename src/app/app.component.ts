import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpService} from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 constructor(private httpService: HttpService) {
 }
  title = 'entrantService';
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.httpService.get('/api/test').subscribe();
  }
}
