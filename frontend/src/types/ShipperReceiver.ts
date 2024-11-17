export interface ShipperReceiver {
  id: number;
  company_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  address: string;
  shipping_hours?: string;
  shipping_manager_name?: string;
  shipping_manager_phone?: string;
  shipping_manager_email?: string;
  rating?: number;
  load_time?: string;
  comments?: string;
  directions?: string;
  do_not_load?: boolean;
}
