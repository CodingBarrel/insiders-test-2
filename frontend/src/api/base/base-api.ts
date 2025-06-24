import axios from 'axios'

export const baseApi = axios.create({
    baseURL:'http://localhost:3031/',
    timeout: 5000,
    }
);

