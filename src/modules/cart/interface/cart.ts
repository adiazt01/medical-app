import { IBranchMedicine } from "@/modules/products/interface/branch-interface";

export interface CartItem {
    id: number;
    cartId: number;
    branchMedicineId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    branchMedicine: IBranchMedicine;
}