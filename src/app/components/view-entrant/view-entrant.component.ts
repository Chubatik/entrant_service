import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {IEntrantFilter} from '../../interfaces/filter/entrant-filter';

@Component({
  selector: 'app-view-entrant',
  templateUrl: './view-entrant.component.html',
  styleUrls: ['./view-entrant.component.css']
})
export class ViewEntrantComponent implements OnInit {
entrants = [];
  constructor(private httpService: HttpService) { }
  page = 0;
  count: number;
  privileges = [];
  specialties = [];
  specialtyId: number;
  privilegeId: number;
  hostelOptions = [{isHostel: true , name: 'Так'}, {isHostel: false , name: 'Ні'}];
  isHostel: boolean;
  name: string;
  surname: string;
  patronym: string;
  filter: IEntrantFilter = {isHostel: null, name: null,
    patronym: null, privilegeId: null, specialtyId: null, surname: null};
  ngOnInit(): void {
    this.httpService.getEntrants( this.page ).subscribe(
      data => {
         this.entrants = data.data.entrants;
         this.count = data.data.count.countEntrant;
      });
    this.getPrivAndSpec();
  }
  getPrivAndSpec(): void {
    this.httpService.getPrivAndSpec().subscribe(
      data => {
        this.privileges = data.data[0];
        this.specialties = data.data[1];
        this.addNonPrivilegeCase();
      });
  }
  addNonPrivilegeCase(): void {
    const nonPrivilegeCase = {
      privilege_id: 0,
      privilege_name: 'Немає пільг'
    };
    this.privileges.push(nonPrivilegeCase);
  }
  changePage(p: number): void {
    this.page = p;
    this.httpService.getEntrants(this.page - 1, this.filter).subscribe(
      (data) => {
        this.entrants = data.data.entrants;
      });
  }
  setFilter(): void{
    this.filter.name = this.name;
    this.filter.surname = this.surname;
    this.filter.isHostel = this.isHostel;
    this.filter.patronym = this.patronym;
    this.filter.privilegeId = this.privilegeId;
    this.filter.specialtyId = this.specialtyId;
    this.setNullValue(this.filter);
    this.httpService.getEntrants( this.page === 0 ? 0 : this.page - 1 , this.filter ).subscribe(
      data => {
        this.entrants = data.data.entrants;
        this.count = data.data.count.countEntrant;
      });
  }
  setNullValue(obj): void {
    for (const i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] === undefined){
        obj[i] = null;
      }
    }
  }
}
