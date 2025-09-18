import type { IImage, IResponse } from './global.types';

export interface ITeacherData {
    fullName: string;
    email: string;
    phone: string;
    gender: string;       // could be replaced with Gender enum
    department: string;
    courses?: string[];   // ObjectIds referencing courses
    profile: File | FileList;
}

export interface ITeacherResponse extends IResponse {
    fullName: string;
    email: string;
    phone: string;
    gender: string;       // could be replaced with Gender enum
    department: string;
    courses?: string[];   // ObjectIds referencing courses
    profile: IImage;
}
