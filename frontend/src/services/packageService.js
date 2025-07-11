import api from './api'

export const getAllPackages = async () => {
    try {
        const response = await api.get('/packages')
        return response.data
    } catch (error) {
        console.error('[PackageService] Error al obtener paquetes:', error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const getPackageById = async (id) => {
    try {
        const response = await api.get(`/packages/${id}`)
        console.log(`[PackageService] Paquete obtenido con ID ${id}:`, response.data)
        return response.data
    } catch (error) {
        console.error(`[PackageService] Error al obtener paquete con ID ${id}:`, error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const createPackage = async (packageData) => {
    try {
        const response = await api.post('/packages', packageData)
        return response.data
    } catch (error) {
        console.error('[PackageService] Error al crear paquete:', error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const updatePackage = async (id, packageData) => {
    try {
        const response = await api.put(`/packages/${id}`, packageData)
        return response.data
    } catch (error) {
        console.error(`[PackageService] Error al actualizar paquete con ID ${id}:`, error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const deletePackage = async (id) => {
    try {
        const response = await api.delete(`/packages/${id}`)
        return response.data
    } catch (error) {
        console.error(`[PackageService] Error al eliminar paquete con ID ${id}:`, error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

