export interface IEntrant{
  passportNumber: number;
  identificationCode: number;
  educationNumber: number;
  militaryTicketNumber: number;
  isHostel: boolean;
  patronym: string;
  independentExamsNumber: number;
  isElevenGrade: boolean;
  privilegeId: number;
  surname: string;
  specialtyId: number;
  name: string;
  isPrivilege: boolean;
}

export interface IEntrantProfile {
  declaration_date: string;
  education_number: string;
  entrant_name: string;
  entrant_patronym: string;
  entrant_surname: string;
  identification_code: string;
  independent_exams_number: number;
  is_eleven_grade: number;
  is_hostel: number;
  is_privilege: boolean;
  military_ticket_number: number;
  passport_number: string;
  privilege_name: string;
  specialty_name: string;
}
