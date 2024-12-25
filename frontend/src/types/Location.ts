// src/types/Location.ts

export interface Category {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string; // Changed from 'company_name' to 'name'
  // Removed 'contact_person' as it's not present in the backend
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  shipping_hours_from?: string; // "H:i" format
  shipping_hours_to?: string; // "H:i" format
  load_time?: string; // "HH:MM:SS" format
  do_not_load?: boolean;
  no_reefers?: boolean;
  categories?: number[]; // Array of category IDs
  charges_lumper?: boolean;
  lumper_fee?: number;
  rating?: number;
  comments?: string;
  directions?: string;
  // Removed photos
}
