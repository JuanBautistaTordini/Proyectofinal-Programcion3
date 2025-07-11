import api from './api'

export const createReservation = async (reservationData) => {
    try {
        const response = await api.post('/reservations', reservationData)
        return response.data
    } catch (error) {
        console.error('[ReservationService] Error al crear reserva:', error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const deleteReservationById = async (id) => {
    try {
        const response = await api.delete(`/reservations/${id}`)
        return response.data
    } catch (error) {
        console.error(`[ReservationService] Error al eliminar reserva con ID ${id}:`, error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}

export const getAllReservations = async () => {
    try {
        const response = await api.get('/reservations')
        return response.data
    } catch (error) {
        console.error('[ReservationService] Error al obtener reservas:', error)
        throw error.response?.data || { message: 'Error de conexión' }
    }
}
