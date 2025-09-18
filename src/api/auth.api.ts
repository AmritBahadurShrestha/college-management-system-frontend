import api from './';
import type { ILoginData, ISignupData } from '../types/auth.types';

export const login = async(data: ILoginData) => {
    try {
        const response = await api.post(`/auth/login`, data)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error.response.data
    }
}

export const signup = async(data: ISignupData) => {
    try {
        const response = await api.post(`/auth/signup`, data)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error.response.data
    }
}

export const getCurrentUser = async() => {
    try {
        const response = await api.get('/auth/me')
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error.response.data
    }
}

export const logout = async() => {
    try {
        const response = await api.post(`/auth/logout`)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error.response.data
    }
}
