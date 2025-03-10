import { del, get, patch, put } from "@/config/http";
import { IGetCartItems } from "../interface/cart-api";
import { IBranchMedicine } from "@/modules/products/interface/branch-interface";

interface CartItem {
    id: number;
    cartId: number;
    branchMedicineId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    branchMedicine: IBranchMedicine;
}

export const getCartItems = async (): Promise<IGetCartItems> => {
    const response = await get('/carts');

    return response as IGetCartItems;
}

export const updateCartItem = async (cartItemId: number, quantity: number): Promise<CartItem> => {
    const response = await patch(`/carts/${cartItemId}`, { quantity });

    return response as CartItem;
}

export const removeCartItem = async (cartItemId: number): Promise<void> => {
    const response = await del(`/carts/${cartItemId}`);

    return response as void;
}