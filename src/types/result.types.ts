import type { ICourseData } from "./course.types";

export interface IResult {
  _id: string;
  student: string;
  class: string;
  program: string;
  semester: number;
  examYear: number;
  examType: string;
  cgpa: number;
  overallStatus: string;
  courses: ICourseData[];
}
