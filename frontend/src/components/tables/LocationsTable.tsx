import React from 'react';
import {
  useTable,
  ColumnInstance,
  Row,
  HeaderGroup,
  TableInstance,
  Column // Import Column for type declaration
} from 'react-table';
import { Link } from 'react-router-dom';
import { Location } from '../../types/Location';

// Define the columns for the table
export const locationsTableColumns: Column<Location>[] = [
  { Header: 'Company Name', accessor: 'company_name' },
  { Header: 'Contact Person', accessor: 'contact_person' },
  { Header: 'Phone Number', accessor: 'phone_number' },
  { Header: 'Email', accessor: 'email' },
  {
    Header: 'Address',
    Cell: ({ row }: { row: Row<Location> }) => {
      const address = `${row.original.address_line1}${
        row.original.address_line2 ? `, ${row.original.address_line2}` : ''
      }`;
      return address;
    }
  },
  { Header: 'Shipping Hours', accessor: 'shipping_hours' },
  { Header: 'Rating', accessor: 'rating' },
  { Header: 'Load Time', accessor: 'load_time' },
  {
    Header: 'Actions',
    Cell: ({ row }: { row: Row<Location> }) => (
      <Link to={`/locations/${row.original.id}`}>View Details</Link>
    )
  }
];

// Component to display locations in a table
const LocationsTable: React.FC<{ data: Location[] }> = ({ data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  }: TableInstance<Location> = useTable<Location>({
    columns: locationsTableColumns, // Use the properly typed columns
    data
  });

  return (
    <table {...getTableProps()} className="table table-striped">
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<Location>) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column: ColumnInstance<Location>) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: Row<Location>) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LocationsTable;
