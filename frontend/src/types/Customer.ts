// File: src/types/Customer.ts

// Basic Customer interface for general customer data
export interface Customer {
  id: number;
  name: string;
  email?: string;
  contact_name?: string;
  phone?: string;
  priority?: 'active' | 'dnu' | 'factoring' | null; // Priority status of the customer
  orders?: any[]; // Orders associated with the customer
  ratings?: any[]; // Ratings or reviews associated with the customer

  // Extended customer information
  mc_number?: string; // Motor Carrier number
  scac?: string; // Standard Carrier Alpha Code
  address_street?: string;
  address_number?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone_number?: string;
  cell_number?: string;
  website?: string;
  credit_limit?: number; // Credit limit in numeric format
  is_active?: boolean; // Whether the customer is active
  factoring?: boolean; // Factoring status
  do_not_use?: boolean; // Flag to mark as "Do Not Use"
  notes?: string; // Notes about the customer

  // Accounts Payable Information
  accounts_payable_contact?: string;
  accounts_payable_phone?: string;
  accounts_payable_email?: string;
  accounts_payable_address?: string;
  accounts_payable_city?: string;
  accounts_payable_state?: string;
  accounts_payable_zip?: string;

  // Agent Information
  agent_name?: string;
  agent_phone?: string;
  agent_email?: string;

  // Financial Information
  tax_id?: string; // Tax identification number
  term_pay?: string; // Payment terms (e.g., "Net 30", "Quickpay")

  // Timestamps
  created_at?: string; // Date when the customer was created
  updated_at?: string; // Date when the customer was last updated
}

// Detailed CustomerFormData interface for form-specific data, matching form input fields
export interface CustomerFormData {
  name: string;
  contact_name: string;
  mc_number: string;
  scac: string;
  address_street: string;
  address_number: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  phone_number: string;
  cell_number: string;
  email: string;
  website: string;
  credit_limit: string; // As a string for form input handling
  is_active: boolean;
  factoring: boolean; // Factoring status
  do_not_use: boolean; // Flag to mark as "Do Not Use"
  notes: string; // Notes about the customer
  priority: 'active' | 'dnu' | 'factoring' | null; // Priority status of the customer

  // Accounts Payable Information
  accounts_payable_contact: string;
  accounts_payable_phone: string;
  accounts_payable_email: string;
  accounts_payable_address: string;
  accounts_payable_city: string;
  accounts_payable_state: string;
  accounts_payable_zip: string;

  // Agent Information
  agent_name: string;
  agent_phone: string;
  agent_email: string;

  // Financial Information
  tax_id: string; // Tax identification number
  term_pay: string; // Payment terms (e.g., "Net 30", "Quickpay")

  // Timestamps (optional for form data)
  created_at?: string; // Date when the customer was created
  updated_at?: string; // Date when the customer was last updated
}

// Simplified Customer interface for selected customer fields
export interface SimpleCustomer {
  id: string;
  name: string;
  email?: string; // Optional email field
  priority?: 'active' | 'dnu' | 'factoring' | null; // Priority status for quick reference
  // Additional fields can be added if needed
}
