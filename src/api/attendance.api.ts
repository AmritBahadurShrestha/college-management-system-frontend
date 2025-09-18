import api from './';
import type { IAttendanceData, IAttendanceResponse } from '../types/attendance.types';

// Create attendance
export const postAttendance = async (data: IAttendanceData) => {
    try {
        const response = await api.post('/attendance', data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get all attendance records
export const getAllAttendance = async () => {
    try {
        const response = await api.get('/attendance');
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Get attendance by ID
export const getAttendanceById = async (id: string) => {
    try {
        const response = await api.get(`/attendance/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Update attendance
export const updateAttendance = async ({ _id, ...data } : Partial<IAttendanceResponse>) => {
    try {
        const response = await api.put(`/attendance/${_id}`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Delete attendance
export const deleteAttendance = async (id: string) => {
    try {
        const response = await api.delete(`/attendance/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
