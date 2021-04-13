import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {IEntrantProfile} from '../../interfaces/entrant/entrant';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-entrant-profile',
  templateUrl: './entrant-profile.component.html',
  styleUrls: ['./entrant-profile.component.css']
})
export class EntrantProfileComponent implements OnInit {

  constructor(private router: ActivatedRoute, private http: HttpService, private toastrService: ToastrService) { }
  entrantId: any;
  entrant: IEntrantProfile = {
    declaration_date: '',
    education_number: '',
    entrant_name: '',
    entrant_patronym: '',
    entrant_surname: '',
    identification_code: '',
    independent_exams_number: 0,
    is_eleven_grade: 0,
    is_hostel: 0,
    is_privilege: false,
    military_ticket_number: 0,
    passport_number: '',
    privilege_name: '',
    specialty_name: ''
  };
  ngOnInit(): void {
    this.router.params.subscribe(entrantId => {
      this.entrantId = entrantId.id;
      this.http.getEntrantInfo(this.entrantId).subscribe(
        (data) => {
          this.entrant = data.data[0];
        }, error => {
          this.toastrService.error('Помилка при завантаженні даних про абітурієнта', 'Профіль абітурієнта');
        });
    });

  }
}
