import api from './';
import type { IClassData, IClassResponse } from '../types/class.types';

// Create a class
export const postClass = async (data: IClassData) => {
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
export const updateClass = async ({ _id, ...data } : Partial<IClassResponse>) => {
    try {
        const response = await api.put(`/class/${_id}`, data);
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
