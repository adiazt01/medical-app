import { IFile } from "@/modules/core/interface/file";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    fileId: number;
    therapeuticActionId: number;
    presentationId: number;
    mainComponentId: number;
    laboratoryId: number;
    createdAt: string;
    updatedAt: string;
    file: IFile;
    laboratory: ILaboratory;
}

export interface ILaboratory {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
}

export interface IGetProductsResponse {
    data: IProduct[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}