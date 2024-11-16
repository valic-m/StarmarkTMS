export interface ContactInfo {
  name: string;
  phone?: string; // Optional
  email?: string; // Optional
  address: string; // Now required
  contact: string; // Ensure this is consistent across usage
}

export interface LoadFormData {
  customer?: string;
  referenceNumber?: string;
  customerId?: number; // Retain for database linkage
  agentId?: string; // Retain for agent selection
  rate?: number;
  trailerType?: string;
  loadType?: string;
  feetRequired?: number;
  palletCount?: number;
  palletDimensions?: string;
  weight?: number;
  commodity?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupTime?: string;
  deliveryTime?: string;
  bookedBy?: string;
  attachment?: File;
  shippers?: ContactInfo[]; // Ensure this matches the updated ContactInfo
  receivers?: ContactInfo[]; // Ensure this matches the updated ContactInfo
}
