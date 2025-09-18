import api from './'

export const fetchDashboard = async() => {
    try {
        const response = await api.get('/dashboard')
        console.log(response.data)
        return response.data.data
    } catch (error: any) {
        throw error.response.data
    }
}
