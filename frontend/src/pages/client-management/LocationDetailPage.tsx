// src/pages/client-management/LocationDetailPage.tsx

import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Location } from 'types/Location';
import { getAllLocations } from 'api/locations';

const LocationDetailPage: React.FC = () => {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getAllLocations();
        setData(locations);
      } catch (err) {
        setError('Failed to fetch locations.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Define the columns for the table
  const locationsTableColumns: ColumnDef<Location>[] = [
    {
      header: 'Name', // Changed from 'Company Name' to 'Name'
      accessorKey: 'name', // Changed from 'company_name' to 'name'
      cell: info => (
        <Link to={`/client-management/locations/${info.row.original.id}`}>
          {info.getValue<string>()}
        </Link>
      )
    },
    // Removed 'Contact Person' column as it's not present in the backend
    { header: 'Phone Number', accessorKey: 'phone_number' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Address',
      cell: info => {
        const { address_line1, address_line2 } = info.row.original;
        return `${address_line1}${address_line2 ? `, ${address_line2}` : ''}`;
      }
    },
    { header: 'Shipping Hours', accessorKey: 'shipping_hours' },
    { header: 'Rating', accessorKey: 'rating' },
    { header: 'Load Time', accessorKey: 'load_time' },
    {
      header: 'Actions',
      cell: info => (
        <Link to={`/client-management/locations/${info.row.original.id}`}>
          View Details
        </Link>
      )
    }
  ];

  const table = useReactTable({
    data,
    columns: locationsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Location Details</h2>
    </div>
  );
};

export default LocationDetailPage;
