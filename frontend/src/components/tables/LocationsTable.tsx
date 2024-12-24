// src/components/tables/LocationsTable.tsx

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import { Location } from 'types/Location';
import FeatherIcon from 'feather-icons-react';

interface Category {
  id: number;
  name: string;
}

interface LocationsTableProps {
  data: Location[];
  categories: Category[];
}

export const locationsTableColumns: ColumnDef<Location, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0' },
      cellProps: { className: 'text-center ps-0' }
    }
  },
  {
    accessorKey: 'company_name',
    header: 'Company Name',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'contact_person',
    header: 'Contact Person',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'address_line1',
    header: 'Address Line 1',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'address_line2',
    header: 'Address Line 2',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'zip_code',
    header: 'Zip Code',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    header: 'Shipping Hours', // Changed 'Header' to 'header'
    accessorFn: (row: Location) =>
      `${row.shipping_hours_from || '--'} - ${row.shipping_hours_to || '--'}`,
    id: 'shipping_hours', // Provide an explicit id since accessor is a function
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'load_time',
    header: 'Load Time',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0' },
      cellProps: { className: 'text-center ps-0' }
    }
  },
  {
    accessorKey: 'do_not_load',
    header: 'Do Not Load',
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0' },
      cellProps: { className: 'text-center ps-0' }
    }
  },
  {
    accessorKey: 'no_reefers',
    header: 'No Reefers',
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0' },
      cellProps: { className: 'text-center ps-0' }
    }
  },
  {
    accessorKey: 'charges_lumper',
    header: 'Charges Lumper',
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0' },
      cellProps: { className: 'text-center ps-0' }
    }
  },
  {
    accessorKey: 'lumper_fee',
    header: 'Lumper Fee',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ getValue, row }) => {
      const categoryIds: number[] = getValue() as number[];
      // Assuming you have a way to map category IDs to names. Adjust as needed.
      const categoryMap: { [key: number]: string } = {};
      row.original.categories?.forEach(id => {
        // Populate categoryMap based on available categories
        // You might need to pass the categories data to the table or handle it here
        // For example:
        // categoryMap[id] = categories.find(cat => cat.id === id)?.name || id.toString();
      });
      const categoryNames = categoryIds
        .map(id => categoryMap[id] || id.toString())
        .join(', ');
      return categoryNames || '--';
    },
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    accessorKey: 'directions',
    header: 'Directions',
    cell: ({ getValue }) => getValue(),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'ps-0' },
      cellProps: { className: 'ps-0' }
    }
  },
  {
    id: 'actions',
    cell: () => (
      <RevealDropdownTrigger>
        <RevealDropdown>
          <ActionDropdownItems />
        </RevealDropdown>
      </RevealDropdownTrigger>
    ),
    meta: {
      headerProps: { style: { width: '5%' }, className: 'ps-0 text-end' },
      cellProps: { className: 'text-end ps-0' }
    }
  }
];

const LocationsTable: React.FC<LocationsTableProps> = ({
  data,
  categories
}) => {
  // Create a category map for easy lookup
  const categoryMap: { [key: number]: string } = {};
  categories.forEach(category => {
    categoryMap[category.id] = category.name;
  });

  // Enhance data with category names
  const enrichedData = data.map(location => ({
    ...location
    // Optionally, include a map if needed in cell rendering
    // categoryMap
  }));

  return (
    <div className="border-top border-translucent">
      <AdvanceTable
        // Ensure the name matches AdvanceTableProps
        tableProps={{ className: 'phoenix-table fs-9' }}
        rowClassName="hover-actions-trigger btn-reveal-trigger"
      />

      <AdvanceTableFooter pagination className="py-4" />
    </div>
  );
};

export default LocationsTable;
