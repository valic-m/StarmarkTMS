export interface Location {
  id: number;
  company_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  shipping_hours?: string;
  load_time?: string;
  shipping_manager_name?: string;
  shipping_manager_phone?: string;
  shipping_manager_email?: string;
  rating?: number;
  comments?: string;
  directions?: string;
  do_not_load?: boolean;
}
