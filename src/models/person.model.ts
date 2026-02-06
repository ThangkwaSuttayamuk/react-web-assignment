type Gender = "Male" | "Female" | "Unsex";

export interface Person {
  id: string;

  title: string;

  firstname: string;
  lastname: string;

  birthday: string;

  nationality: string;

  citizenId: string;

  gender: Gender;

  countryCode: string;

  passportNo: string;

  expectedSalary: number;
}
