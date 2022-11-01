import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:1919"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

  export const getDate = (date) => API.post('/app/date', date)
  export const getAppointData = (id) => API.get(`/app/user/${id}`)
  export const cancelAppointment = (id) => API.get(`/app/cancel/${id}`)
  export const allAppointment = (page) => API.get(`/app/all?page=${page}`)
  export const getSlot = (bookData, navigate) => API.post('/app/booking', bookData)