import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-add-entrant',
  templateUrl: './add-entrant.component.html',
  styleUrls: ['./add-entrant.component.css']
})
export class AddEntrantComponent implements OnInit {
  specialties = [];
  privileges = [];
  isPrivilege = true;
  isElevenClass = true;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get('/api/add-form').subscribe(
      data => {
        this.privileges = data.data[0];
        this.specialties = data.data[1];
        console.log(this.specialties);
      }
    );
  }
  togglePrivilege(): void {
    this.isPrivilege = !this.isPrivilege;
  }
  toggleElevenClass(): void {
    this.isElevenClass = !this.isElevenClass;
  }
}
