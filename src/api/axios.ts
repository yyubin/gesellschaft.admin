import axios from 'axios';

const baseURL = __API_URL__;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});