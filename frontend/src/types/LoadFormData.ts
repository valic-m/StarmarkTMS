export interface LoadFormData {
  customer?: string;
  referenceNumber?: string;
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
}
