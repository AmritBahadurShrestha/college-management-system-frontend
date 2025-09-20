import api from './';

// Create a class
export const postClass = async (data: FormData) => {
    try {
        const response = await api.post('/class', data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get all classes
export const getAllClasses = async () => {
    try {
        const response = await api.get('/class');
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get class by ID
export const getClassById = async (id: string) => {
    try {
        const response = await api.get(`/class/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Update a class
export const updateClass = async ({ _id, formData } : { _id: string, formData: FormData }) => {
    try {
        const response = await api.put(`/class/${_id}`, formData);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Delete a class
export const deleteClass = async (id: string) => {
    try {
        const response = await api.delete(`/class/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
