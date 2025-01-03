// src/services/truckService.ts

/**
 * TruckService - Contains higher-level business logic or domain operations
 * involving Truck data, beyond basic CRUD.
 */
import {
  getTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  patchTruck,
  deleteTruck
} from '../api/trucks';
import { Truck } from '../types/truck';

/**
 * Example: Fetch all trucks and do additional processing, if needed.
 */
export async function fetchAllTrucks(): Promise<Truck[]> {
  // Basic call to the API
  const trucks = await getTrucks();

  // Example: Sort by name or do some data transformation?
  // (Skip sorting if not needed)
  // trucks.sort((a, b) => a.name.localeCompare(b.name));

  return trucks;
}

/**
 * Example: Create a new truck with optional domain logic
 */
export async function createNewTruck(
  truckData: Partial<Truck>
): Promise<Truck> {
  // For example, ensure manufacturer is always uppercase:
  if (truckData.manufacturer) {
    truckData.manufacturer = truckData.manufacturer.toUpperCase();
  }

  // Or set a default color if none provided:
  if (!truckData.color) {
    truckData.color = 'White';
  }

  // Now call the actual API method
  return await createTruck(truckData);
}

/**
 * Example: Update a truck with full (PUT) or partial (PATCH).
 */
export async function updateExistingTruck(
  truckId: number,
  truckData: Partial<Truck>
): Promise<Truck> {
  // Suppose we always do partial updates:
  return await patchTruck(truckId, truckData);

  // Or if you prefer a full PUT, comment out the patch above and do:
  // return await updateTruck(truckId, truckData);
}

/**
 * Example: Delete a truck by ID.
 */
export async function removeTruck(truckId: number): Promise<void> {
  // Could check if the truck is out_of_service first, etc.
  await deleteTruck(truckId);
}

/**
 * Example: Fetch a single truck by ID and optionally enrich data.
 */
export async function fetchSingleTruck(truckId: number): Promise<Truck> {
  const truck = await getTruckById(truckId);
  // Optionally do something like:
  // if (truck.decoded_make) {
  //   truck.name = `${truck.decoded_make} - ${truck.name}`;
  // }
  return truck;
}
