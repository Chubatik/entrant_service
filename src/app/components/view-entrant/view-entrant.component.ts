import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-view-entrant',
  templateUrl: './view-entrant.component.html',
  styleUrls: ['./view-entrant.component.css']
})
export class ViewEntrantComponent implements OnInit {
entrants = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get('/api/test').subscribe(
      data => {
         this.entrants = data.data;
      }
    );
  }

}
