import * as yup from 'yup';

export const AttendanceSchema = yup.object({
    student: yup.string().required('Student ID is required'),  
    class: yup.string().required('Class ID is required'),    
    course: yup.string().required('Course ID is required'),   
    date: yup.date().required('Date is required'),    
    status: yup.string().oneOf(['Present', 'Absent', 'Leave'], 'Invalid attendance status').required('Attendance status is required'),   
    remarks: yup.string().optional()
});
