import { post } from '@/config/http';

export const createPayment = async (data: any) => {
    const response = await post('/payments', data);

    return response;
}