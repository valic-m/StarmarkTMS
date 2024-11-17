import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import SearchBox from 'components/common/SearchBox';
import ShippersReceiversTable, {
  shippersReceiversTableColumns
} from 'components/tables/ShippersReceiversTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { useState, useEffect, ChangeEvent } from 'react';
import { fetchShippersReceivers } from 'api/shippersReceivers';

const tabItems: FilterTabItem[] = [
  { label: 'All', value: 'all', count: 100 },
  { label: 'Top Rated', value: 'top_rated', count: 25 },
  { label: 'Frequently Used', value: 'frequent', count: 75 }
];

const filterMenus: FilterMenu[] = [
  { label: 'Rating', items: [{ label: '5 Stars' }, { label: '4 Stars' }] },
  { label: 'Type', items: [{ label: 'Shippers' }, { label: 'Receivers' }] }
];

const ShippersReceivers = () => {
  const [shippersReceivers, setShippersReceivers] = useState([]);
  const table = useAdvanceTable({
    data: shippersReceivers,
    columns: shippersReceiversTableColumns,
    pageSize: 10,
    pagination: true,
    sortable: true,
    selection: true
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShippersReceivers();
      setShippersReceivers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <PageBreadcrumb items={defaultBreadcrumbItems} />
      <div className="mb-9">
        <h2 className="mb-4">Shippers & Receivers</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />

        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search Shippers/Receivers"
                onChange={handleSearchInputChange}
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
                  Add Shipper/Receiver
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <ShippersReceiversTable />
          </div>
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export default ShippersReceivers;
