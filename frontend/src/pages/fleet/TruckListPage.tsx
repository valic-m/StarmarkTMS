// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\TruckListPage.tsx

import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import SearchBox from 'components/common/SearchBox';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import Button from 'components/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';

// Import your Truck interface and the function to fetch trucks
import { Truck } from 'api/trucks'; // or wherever your Truck interface is located
import { getTrucks } from 'api/trucks';

/**
 * Example TruckListPage implementing a table similar to ShipperReceiverListPage.
 * Adjust columns, filters, and UI as needed for your truck data.
 */
const TruckListPage: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trucks from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrucks(); // GET /api/trucks/ (or similar)
        setTrucks(data);
        setFilteredTrucks(data);
      } catch (err) {
        console.error('Error fetching trucks:', err);
        setError('Failed to fetch trucks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic based on search query
  useEffect(() => {
    let temp = [...trucks];
    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      temp = temp.filter(
        truck =>
          truck.name?.toLowerCase().includes(lowerSearch) ||
          truck.vin?.toLowerCase().includes(lowerSearch) ||
          truck.license_plate?.toLowerCase().includes(lowerSearch)
      );
    }
    setFilteredTrucks(temp);
  }, [searchQuery, trucks]);

  // Example Tab items (if you want categories like "All", "Leased", etc.)
  const tabItems: FilterTabItem[] = [
    { label: 'All', value: 'all', count: trucks.length }
    // Add more if needed, e.g., leased vs. owner-operator
    // { label: 'Leased', value: 'leased', count: trucks.filter(t => t.is_leased).length },
    // { label: 'Owner-Operated', value: 'oo', count: trucks.filter(t => t.owner_operated).length },
  ];

  // You can define any FilterButtonGroup menus here
  const filterMenus: FilterMenu[] = [
    {
      label: 'Status',
      items: [{ label: 'Active' }, { label: 'Out of Service' }]
    }
  ];

  // Example columns for the truck table
  // Adjust accessorKey to match your actual Truck fields.
  const columns: ColumnDef<Truck>[] = [
    {
      header: 'Truck Name',
      accessorKey: 'name',
      cell: info => (
        <Link to={`/fleet/trucks/${info.row.original.id}`}>
          {info.getValue<string>()}
        </Link>
      )
    },
    {
      header: 'License Plate',
      accessorKey: 'license_plate'
    },
    {
      header: 'Year',
      accessorKey: 'year'
    },
    {
      header: 'VIN',
      accessorKey: 'vin'
    },
    {
      header: 'Actions',
      cell: info => (
        <Link to={`/fleet/trucks/${info.row.original.id}`}>View Details</Link>
      )
    }
  ];

  // Setup TanStack table
  const table = useReactTable({
    data: filteredTrucks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  });

  return (
    <div>
      <PageBreadcrumb
        items={[{ label: 'Home', url: '/' }, { label: 'Trucks' }]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Trucks</h2>
        {/* Filter tab at top */}
        <FilterTab tabItems={tabItems} className="mb-2" />

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-3">
            {/* Search box */}
            <SearchBox
              placeholder="Search trucks (name, vin, plate)"
              onChange={e => setSearchQuery(e.target.value)}
            />
            {/* Possibly more advanced filters */}
            <div className="scrollbar overflow-hidden-y">
              <FilterButtonGroup menus={filterMenus} />
            </div>

            <div className="ms-xxl-auto">
              <Button variant="link" className="text-body me-4 px-0">
                <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                Export
              </Button>
              <Link
                to="/fleet/trucks/add" // or wherever your "Add Truck" form is
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Truck
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
          {loading ? (
            <p>Loading trucks...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              {/* TanStack Table */}
              <table className="table table-striped">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Simple pagination */}
              <div className="d-flex justify-content-between align-items-center py-2">
                <div>
                  {table.getState().pagination.pageSize *
                    table.getState().pagination.pageIndex +
                    1}{' '}
                  to{' '}
                  {table.getState().pagination.pageSize *
                    table.getState().pagination.pageIndex +
                    table.getRowModel().rows.length}{' '}
                  of {filteredTrucks.length}
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="link"
                    className="p-0"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="link"
                    className="p-0"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TruckListPage;
