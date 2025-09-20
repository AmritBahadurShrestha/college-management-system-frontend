import * as yup from 'yup';
import { Gender } from '../types/enum';

export const TeacherSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    phone: yup.string().required('Phone number is required'),
    gender: yup.mixed<Gender>().oneOf(Object.values(Gender), 'Invalid gender').required('Gender is required'),
    department: yup.string().required('Department is required'),
    courses: yup.array().of(yup.string()).optional(),
    profile: yup.mixed().required('Profile is required'),
    isActive: yup.boolean().default(true)
})
