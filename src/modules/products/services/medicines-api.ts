import { get } from "@/config/http";
import qs from 'qs';

export const getProducts = async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
) => {
    const queryObject: any = {
        page,
        limit,
        search,
    };

    if (search !== '') {
        queryObject.search = search;
    }

    const query = qs.stringify(queryObject);

    const response = await get('/medicines' + (query ? `?${query}` : ''));
    return response;
}