import { CartItem } from "./cart";

export interface IGetCartItems {
    data: CartItem[];
    meta: {
        total: number;
    }
}