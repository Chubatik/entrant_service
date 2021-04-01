import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-entrant',
  templateUrl: './add-entrant.component.html',
  styleUrls: ['./add-entrant.component.css']
})
export class AddEntrantComponent implements OnInit {
    educationNumber: number;
    identificationCode: number;
    independentExamsNumber: number;
    isElevenGrade: boolean;
    isHostel: boolean;
    isPrivilege: boolean;
    militaryTicketNumber: number;
    name = '';
    passportNumber: number;
    patronym = '';
    privilegeId: number;
    specialtyId: number;
    surname = '';
    specialties = [];
    privileges = [];
    hostelOptions = [{isHostel: true , name: 'Так'}, {isHostel: false , name: 'Ні'}];
    patternForTextInput = /[А-ЯІЇЄҐ]{2,50}$/gi; // Потрібно ввести від 2 до 50 символів кирилиці
    nameMatch = true;
    patronymMatch = true;
    surnameMatch = true;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getPrivAndSpec();
  }
  getPrivAndSpec(): void {
    this.httpService.get('/api/add-form').subscribe(
      data => {
        this.privileges = data.data[0];
        this.specialties = data.data[1];
        this.addNonPrivilegeCase();
      }
    );
  }
  addNonPrivilegeCase(): void {
    const nonPrivilegeCase = {
      privilege_id: null,
      privilege_name: 'Немає пільг'
    };
    this.privileges.push(nonPrivilegeCase);
  }
  checkNonPrivilegeCase(): void {
    this.isPrivilege = this.privilegeId !== null;
  }
  checkNonElevenGradeCase(): void {
    if (this.isElevenGrade === false) {
      this.independentExamsNumber = null;
      this.militaryTicketNumber = null;
    }
  }
  checkForm(): void {
    this.nameMatch = !!this.name.match(this.patternForTextInput);
    this.patronymMatch = !!this.patronym.match(this.patternForTextInput);
    this.surnameMatch = !!this.surname.match(this.patternForTextInput);

  }
  addEntrant(form: NgForm): void {
    this.checkForm();
    this.checkNonPrivilegeCase();
    this.checkNonElevenGradeCase();
    const entrant = {
      educationNumber: this.educationNumber,
      identificationCode: this.identificationCode,
      independentExamsNumber: this.independentExamsNumber,
      isElevenGrade: this.isElevenGrade,
      isHostel: this.isHostel,
      isPrivilege: this.isPrivilege,
      militaryTicketNumber: this.militaryTicketNumber,
      name: this.name,
      passportNumber: this.passportNumber,
      patronym: this.patronym,
      privilegeId: this.privilegeId,
      specialtyId: this.specialtyId,
      surname: this.surname
    };
    // form.reset();
  }
}
