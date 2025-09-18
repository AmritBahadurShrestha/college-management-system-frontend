import type { IResponse } from './global.types';

export interface IClassData {
    name: string;
    program: string;
    semester: number;
    students?: string[]; // ObjectIds referencing students
    courses?: string[];  // ObjectIds referencing courses
    teacher?: string;    // ObjectId referencing teacher
}

export interface IClassResponse extends IResponse {
    name: string;
    program: string;
    semester: number;
    students?: string[]; // ObjectIds referencing students
    courses?: string[];  // ObjectIds referencing courses
    teacher?: string;    // ObjectId referencing teacher
}
