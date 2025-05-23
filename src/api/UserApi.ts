import { apiClient } from './axios';

export const logout = async () => {
    const res = await apiClient.post('/logout');
    return res.data;
}