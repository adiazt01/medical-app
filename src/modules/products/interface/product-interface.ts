export interface IProduct {
    id: number;
    file: {
        id: number;
        path: string;
    }
    name: string;
    brand: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    discount?: string;
    inStock: boolean;
    availableBranches: string[];
}


export interface IGetProductsResponse {
    data: IProduct[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}