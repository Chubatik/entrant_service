import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {IEntrant} from '../../interfaces/entrant/entrant';

@Component({
  selector: 'app-entrant-profile',
  templateUrl: './entrant-profile.component.html',
  styleUrls: ['./entrant-profile.component.css']
})
export class EntrantProfileComponent implements OnInit {

  constructor(private router: ActivatedRoute, private http: HttpService) { }
  entrantId: any;
  entrant: IEntrant;
  ngOnInit(): void {
    this.router.params.subscribe(entrantId => {
      this.entrantId = entrantId.id;
      this.http.getEntrantInfo(this.entrantId).subscribe(
        (data) => {
          this.entrant = data.data[0];
        });
    });

  }

}
