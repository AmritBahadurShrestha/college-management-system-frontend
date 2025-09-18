import type { IResponse } from './global.types';

export interface IAttendanceData {
    student: string;   // ObjectId reference to student
    class: string;     // ObjectId reference to class
    course: string;    // ObjectId reference to course
    date: Date | string;
    status: string;    // or enum if you want to import AttendanceStatus
    remarks?: string;
}

export interface IAttendanceResponse extends IResponse {
    student: string;   // ObjectId reference to student
    class: string;     // ObjectId reference to class
    course: string;    // ObjectId reference to course
    date: Date | string;
    status: string;    // or enum if you want to import AttendanceStatus
    remarks?: string;
}
