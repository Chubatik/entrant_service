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
  years = [];
  specialtyId: number;
  privilegeId: number;
  hostelOptions = [{isHostel: true , name: 'Так'}, {isHostel: false , name: 'Ні'}];
  isHostel: boolean;
  name: string;
  surname: string;
  patronym: string;
  year: number;
  filter: IEntrantFilter = {isHostel: null, name: null,
    privilegeId: null, specialtyId: null, surname: null, year: null}; // patronym: null,
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
        this.privileges = data.data.privileges;
        this.specialties = data.data.specialties;
        this.addNonPrivilegeCase();
        this.years = this.getYears(data.data.years);
      });
  }
  getYears(years): any[] {
    const ys = [];
    for (let i = 0; i < years.length; i++) {
      const y = { id : i, value : years[i].years };
      ys.push(y);
    }
    return ys;
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
    console.log(this.year);
    this.filter.name = this.name;
    this.filter.surname = this.surname;
    this.filter.isHostel = this.isHostel;
    // this.filter.patronym = this.patronym;
    this.filter.privilegeId = this.privilegeId;
    this.filter.specialtyId = this.specialtyId;
    this.filter.year = this.year;
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
