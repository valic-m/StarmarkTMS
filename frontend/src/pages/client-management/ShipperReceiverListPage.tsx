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
import { getAllLocations } from 'api/locations';
import { Location } from 'types/Location';

// Define table columns
const columns: ColumnDef<Location>[] = [
  {
    header: 'Company Name',
    accessorKey: 'company_name',
    cell: info => (
      <Link to={`/client-management/locations/${info.row.original.id}`}>
        {info.getValue<string>()}
      </Link>
    )
  },
  { header: 'Contact Person', accessorKey: 'contact_person' },
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
  { header: 'Load Time', accessorKey: 'load_time' },
  {
    header: 'Actions',
    cell: info => (
      <Link to={`/locations/${info.row.original.id}`}>View Details</Link>
    )
  }
];

// Filter tab items
const tabItems: FilterTabItem[] = [
  { label: 'All', value: 'all', count: 100 },
  { label: 'Shippers', value: 'shippers', count: 60 },
  { label: 'Receivers', value: 'receivers', count: 40 }
];

// Filter menu items
const filterMenus: FilterMenu[] = [
  {
    label: 'Rating',
    items: [
      { label: '1 Star' },
      { label: '2 Stars' },
      { label: '3 Stars' },
      { label: '4 Stars' },
      { label: '5 Stars' }
    ]
  },
  {
    label: 'Country',
    items: [{ label: 'USA' }, { label: 'Canada' }, { label: 'Others' }]
  }
];

const ShipperReceiverListPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to fetch locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const table = useReactTable({
    data: locations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const handleSearch = (value: string) => {
    console.log('Search value:', value);
    // Add search logic here if needed
  };

  return (
    <div>
      <PageBreadcrumb
        items={[{ label: 'Home', url: '/' }, { label: 'Locations' }]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Locations</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <div className="mb-4">
          <div className="d-flex flex-wrap gap-3">
            <SearchBox
              placeholder="Search locations"
              onChange={e => handleSearch(e.target.value)}
            />
            <div className="scrollbar overflow-hidden-y">
              <FilterButtonGroup menus={filterMenus} />
            </div>
            <div className="ms-xxl-auto">
              <Button variant="link" className="text-body me-4 px-0">
                <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                Export
              </Button>
              <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Location
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
          {loading ? (
            <p>Loading locations...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipperReceiverListPage;
