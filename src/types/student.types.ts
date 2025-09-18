import type { IImage, IResponse } from './global.types';

export interface IStudentData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dob: Date | string;
    gender: string; // or enum if you have Gender enum imported
    rollNumber: string;
    registrationNumber: string;
    program: string;
    semester: number;
    courses?: string[]; // array of ObjectIds (course IDs)
    profile: File | FileList;
}

export interface IStudentResponse extends IResponse {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dob: Date | string;
    gender: string; // or enum if you have Gender enum imported
    rollNumber: string;
    registrationNumber: string;
    program: string;
    semester: number;
    courses?: string[]; // array of ObjectIds (course IDs)
    profile: IImage;
}
