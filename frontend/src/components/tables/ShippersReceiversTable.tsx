import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { ShipperReceiver } from 'types/ShipperReceiver';

export const shippersReceiversTableColumns: ColumnDef<ShipperReceiver>[] = [
  {
    accessorKey: 'company_name',
    header: 'Company Name',
    cell: ({ row: { original } }) => original.company_name,
    meta: {
      headerProps: { style: { width: '20%' }, className: 'pe-5' },
      cellProps: { className: 'fw-semibold text-body-highlight pe-5' }
    }
  },
  {
    accessorKey: 'contact_person',
    header: 'Contact Person',
    cell: ({ row: { original } }) => original.contact_person,
    meta: {
      headerProps: { style: { width: '20%' }, className: 'pe-5' },
      cellProps: { className: 'pe-5' }
    }
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row: { original } }) => `${original.rating}/5`,
    meta: {
      headerProps: { style: { width: '10%' }, className: 'text-center' },
      cellProps: { className: 'text-center fw-bold' }
    }
  },
  {
    accessorKey: 'address',
    header: 'Address',
    meta: {
      headerProps: { style: { width: '30%' } },
      cellProps: { className: 'text-body-highlight white-space-nowrap' }
    }
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone',
    cell: ({ row: { original } }) => original.phone_number,
    meta: {
      headerProps: { style: { width: '20%' }, className: 'text-center' },
      cellProps: { className: 'text-center text-body-emphasis' }
    }
  }
];

const ShippersReceiversTable = () => {
  return (
    <div>
      <AdvanceTable tableProps={{ className: 'phoenix-table fs-9' }} />
      <AdvanceTableFooter pagination />
    </div>
  );
};

export default ShippersReceiversTable;
