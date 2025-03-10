import { get } from "@/config/http";
import qs from 'qs';
import { IGetProductsResponse } from "../interface/product-interface";

export const getProducts = async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
):
    Promise<IGetProductsResponse> => {
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

export const getProduct = async (
    productId: number,
) => {
    const response = await get("/medicines/"+ productId);
    return response;
}