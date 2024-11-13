// utils.ts

export interface FormData {
  companyType: string;
  employmentType: string;
  salary: number;
  hoursWorked: number;
  isEducated: boolean;
}

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};