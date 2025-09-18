import api from './';

export const dashboard = async() => {
    try {
        const response = await api.get('/dashboard');
        console.log(response.data);
        return response.data.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
