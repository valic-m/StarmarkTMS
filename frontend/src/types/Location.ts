export interface Category {
  id: number;
  name: string;
}

export interface OperatingHour {
  day: string;
  open_time: string;
  close_time: string;
}

export interface Location {
  // Optional or required depends on your usage:
  id?: number;

  // Basic info:
  name: string;
  phone_number?: string;
  email?: string;

  // Address:
  address_line1: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip_code?: string;

  // Shipping & loading:
  shipping_hours_from?: string; // e.g. "HH:MM" format
  shipping_hours_to?: string; // e.g. "HH:MM" format
  load_time?: string; // e.g. "HH:MM:SS"

  // Flags:
  do_not_load?: boolean;
  no_reefers?: boolean;
  charges_lumper?: boolean;

  // Additional data:
  lumper_fee?: number;
  rating?: number;
  comments?: string;
  directions?: string;

  // Plus Code and Website:
  plus_code?: string;
  website?: string;

  // Lat & Lng
  lat?: number;
  lng?: number;

  // Categories (list of IDs):
  categories?: number[];

  // Operating hours array
  operating_hours?: OperatingHour[];

  // Appointment requirements:
  appointment_required?: boolean;
  fcfs?: boolean;
}

// Alternative full Location interface:
export interface FullLocation {
  id: number;
  name: string;
  phone_number?: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  categories?: number[];
  appointment_required?: boolean;
  fcfs?: boolean;
  operating_hours?: OperatingHour[];
}
