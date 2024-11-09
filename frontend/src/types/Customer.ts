// File: src/types/Customer.ts

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  contact_name?: string;
  mc_number?: string;
  city?: string;
  phone_number?: string;
  credit_limit?: number;
  // Add any other properties as needed
}
