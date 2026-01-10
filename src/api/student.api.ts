import api from './';

// Create student (FormData for profile upload)
export const postStudent = async (data: FormData) => {
    try {
        const response = await api.post('/student', data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get all students
export const getAllStudents = async (page:number, perPage:number, params?:{query:string}) => {
    try {
        const response = await api.get(`/student?current_page=${page}&per_page=${perPage}`,{
            params
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get all students list used in all forms
export const getAllStudentsList = async () => {
    try {
        const response = await api.get('/student/all');
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get student by ID
export const getStudentById = async (id:string) => {
    try {
        const response = await api.get(`/student/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Update student
export const updateStudent = async ({ _id, formData } : { _id: string, formData: FormData }) => {
    try {
        const response = await api.put(`/student/${_id}`, formData);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Delete student
export const deleteStudent = async (id:string) => {
    try {
        const response = await api.delete(`/student/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};


export const getStudentsByClass = async (classId: string) => {
  const response = await api.get(`/students/class/${classId}`);
  return response.data;
};
