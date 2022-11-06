import axios from 'axios'

const API = axios.create({baseURL: "https://doc-app-manage.herokuapp.com"})

export const signIn = (formData) => API.post('/auth/signin', formData)
export const signUp = (formData) => API.post('/auth/signup', formData)