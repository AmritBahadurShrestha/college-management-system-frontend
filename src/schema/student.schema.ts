import * as yup from 'yup';

export const StudentSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    dob: yup.date().required('Date of birth is required'),
    gender: yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
    rollNumber: yup.string().required('Roll number is required'),
    registrationNumber: yup.string().required('Registration number is required'),
    program: yup.string().required('Program is required'),
    semester: yup.number().min(1, 'Semester must be at least 1').max(8, 'Semester cannot exceed 8').required('Semester is required'),
    courses: yup.array().of(yup.string()).optional(),
    profile: yup.mixed().required('Profile is required'),
    isActive: yup.boolean().default(true)
})
