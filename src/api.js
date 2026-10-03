import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

export const getSeats = () => api.get("/seats").then((res) => res.data)
export const getBookings = () => api.get("/bookings").then((res) => res.data)
export const createBooking = (booking) => api.post("/bookings", booking).then((res) => res.data)
export const updateSeat = (id, changes) => api.patch(`/seats/${id}`, changes).then((res) => res.data)
export const deleteBooking = (id) => api.delete(`/bookings/${id}`)
