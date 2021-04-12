import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {NgForm} from '@angular/forms';
import {IEntrant} from '../../interfaces/entrant/entrant';

@Component({
  selector: 'app-add-entrant',
  templateUrl: './add-entrant.component.html',
  styleUrls: ['./add-entrant.component.css'],
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
    match = {
      nameMatch : true,
      patronymMatch : true,
      surnameMatch : true,
      idMatch : true,
      examsMatch : true,
      educationMatch : true,
      passportMatch : true,
      militaryMatch : true
    };

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getPrivAndSpec();
  }
  getPrivAndSpec(): void {
    this.httpService.getPrivAndSpec().subscribe(
      data => {
        this.privileges = data.data.privileges;
        this.specialties = data.data.specialties;
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
    this.isPrivilege = this.privilegeId !== null && this.privilegeId !== undefined;
  }
  checkNonElevenGradeCase(): void {
    if (this.isElevenGrade === false) {
      this.independentExamsNumber = null;
      this.militaryTicketNumber = null;
    }
  }
  checkForm(): void {
    this.match.nameMatch = this.getMatch(this.name, this.patternForTextInput);
    this.match.patronymMatch = this.getMatch(this.patronym, this.patternForTextInput);
    this.match.surnameMatch = this.getMatch(this.surname, this.patternForTextInput);
    this.match.idMatch = this.getMatch(this.identificationCode, this.getPatternForNumberInput(10));
    this.match.educationMatch = this.getMatch(this.educationNumber, this.getPatternForNumberInput(8));
    this.match.passportMatch = this.getMatch(this.passportNumber, this.getPatternForNumberInput(9));
    if (this.isElevenGrade) {
      this.match.examsMatch = this.getMatch(this.independentExamsNumber, this.getPatternForNumberInput(7));
      this.match.militaryMatch = this.getMatch(this.militaryTicketNumber, this.getPatternForNumberInput(10));
    }
  }
  getPatternForNumberInput(amount: number): RegExp {
    const regex = `[0-9]{${amount}}`;
    return new RegExp(regex, 'g');
  }
  getMatch(value, regex: RegExp): boolean {
    return value === undefined || value === null ? false : !!value.toString().match(regex);
  }
  setNullValue(obj): void {
    for (const i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] === undefined){
        obj[i] = null;
      }
    }
  }
  checkMatch(): boolean {
    for (const i in this.match) {
      if (this.match[i] === false) return false;
    }
    return true;
}
  addEntrant(form: NgForm): void {
    this.checkForm();
    this.checkNonPrivilegeCase();
    this.checkNonElevenGradeCase();
    const entrant: IEntrant = {
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
    this.setNullValue(entrant);
    if (this.checkMatch()){
      this.httpService.addEntrant(entrant).subscribe(
        (data) => {

        }, error => {}
      );
    }
    // form.reset();
  }
}
