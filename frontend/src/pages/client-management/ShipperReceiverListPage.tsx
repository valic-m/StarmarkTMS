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

const ShipperReceiverListPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
        setFilteredLocations(data); // Initialize filtered list
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to fetch locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery, locations]);

  // Define table columns
  const columns: ColumnDef<Location>[] = [
    {
      header: 'Company Name',
      accessorKey: 'name',
      cell: info => (
        <Link to={`/client-management/locations/${info.row.original.id}`}>
          {info.getValue<string>()}
        </Link>
      )
    },
    { header: 'Phone Number', accessorKey: 'phone_number' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Address',
      cell: info => {
        const { address_line1, address_line2 } = info.row.original;
        return `${address_line1}${address_line2 ? `, ${address_line2}` : ''}`;
      }
    },
    { header: 'City', accessorKey: 'city' },
    { header: 'State', accessorKey: 'state' },
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
    data: filteredLocations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const tabItems: FilterTabItem[] = [
    { label: 'All', value: 'all', count: locations.length },
    {
      label: 'Shippers',
      value: 'shippers',
      count: locations.filter(loc => loc.categories?.includes(1)).length
    },
    {
      label: 'Receivers',
      value: 'receivers',
      count: locations.filter(loc => loc.categories?.includes(2)).length
    }
  ];

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
      label: 'States',
      items: Array.from(new Set(locations.map(loc => loc.state))).map(
        state => ({ label: state })
      )
    }
  ];

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
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="scrollbar overflow-hidden-y">
              <FilterButtonGroup menus={filterMenus} />
            </div>
            <div className="ms-xxl-auto">
              <Button variant="link" className="text-body me-4 px-0">
                <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                Export
              </Button>
              <Link
                to="/client-management/shippers-receivers/add"
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Location
              </Link>
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
