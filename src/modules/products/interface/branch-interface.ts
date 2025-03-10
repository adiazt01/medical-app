import { IProduct } from "./product-interface";

export interface IBranch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBranchMedicine {
    id: number;
    branchId: number;
    medicineId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    medicine: IProduct;
    branch: IBranch;
}