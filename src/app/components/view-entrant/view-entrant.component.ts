import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {IEntrantFilter} from '../../interfaces/filter/entrant-filter';
import {ToastrService} from 'ngx-toastr';
import * as expMethods from '../../shared/methods/methods';
import {getAccess} from '../../shared/methods/methods';
import {Router} from '@angular/router';
@Component({
  selector: 'app-view-entrant',
  templateUrl: './view-entrant.component.html',
  styleUrls: ['./view-entrant.component.css']
})
export class ViewEntrantComponent implements OnInit {
entrants = [];
  isFilters = false;
  constructor(private httpService: HttpService, private toastrService: ToastrService,
              public router: Router ) { }
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
  title = 'Список абітурієнтів';
  filter: IEntrantFilter = {isHostel: null, name: null,
    privilegeId: null, specialtyId: null, surname: null, year: null}; // patronym: null,

  ngOnInit(): void {
    this.httpService.getEntrants( this.page ).subscribe(
      data => {
         this.entrants = data.data.entrants;
         this.count = data.data.count.countEntrant;
      }, error => {
        this.toastrService.error('Помилка при завантаженні абітурієнтів', this.title);
      });
    this.getPrivAndSpec();
  }
  getPrivAndSpec(): void {
    this.httpService.getPrivAndSpec().subscribe(
      data => {
        this.privileges = expMethods.addNonPrivilegeCase(data.data.privileges);
        this.specialties = data.data.specialties;
        this.years = expMethods.getYearsObj(data.data.years);
      }, error => {
        this.toastrService.error('Помилка при завантаженні спеціальностей та пільг', this.title);
      });
  }

  changePage(p: number): void {
    this.page = p;
    this.httpService.getEntrants(this.page - 1, this.filter).subscribe(
      (data) => {
        this.entrants = data.data.entrants;
      }, error => {
        this.toastrService.error('Помилка при завантаженні абітурієнтів', this.title);
      });
  }
  setFilter(): void{
    this.filter.name = this.name;
    this.filter.surname = this.surname;
    this.filter.isHostel = this.isHostel;
    // this.filter.patronym = this.patronym;
    this.filter.privilegeId = this.privilegeId;
    this.filter.specialtyId = this.specialtyId;
    this.filter.year = this.year;
    console.log(this.filter.isHostel)
    // expMethods.setNullValue(this.filter);
    this.httpService.getEntrants( this.page === 0 ? 0 : this.page - 1 , this.filter ).subscribe(
      data => {
        this.entrants = data.data.entrants;
        this.count = data.data.count.countEntrant;
      }, error => {
        this.toastrService.error('Помилка при завантаженні абітурієнтів', this.title);
      });
  }

  toggleFilters(): void {
    this.isFilters = !this.isFilters;
  }
  goToPage(route, id): void {
    if (!getAccess()) {
      this.toastrService.warning('У вас немає доступу', this.title);
    } else {
      this.router.navigate([`/${route}/${id}`]);
    }
  }
}
