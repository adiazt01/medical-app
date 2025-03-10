import { get } from "@/config/http";

export const getBranchsMedicinesByMedicineId = async (medicineId: number) => {
  const response = await get(`/branch-medicines/medicines/${medicineId}`);
  return response;
};
