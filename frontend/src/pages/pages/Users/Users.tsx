import { useEffect, useState, ChangeEvent } from 'react';
import { format } from 'date-fns'; // Add date-fns for formatting
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import SearchBox from 'components/common/SearchBox';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Col, Row } from 'react-bootstrap';
import { userBreadcrumbItems } from 'data/users'; // Update breadcrumb data import
import UsersTable, { usersTableColumns } from 'components/tables/UsersTable'; // Update table import
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import api from 'api'; // Import the API utility

// Define the User type
type User = {
  id: number;
  avatar?: string;
  name: string;
  email: string;
  city: string;
  mobile: string;
  lastActive: string;
  joined: string;
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy HH:mm'); // Example: Dec 12, 2024 14:48
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api('/api/users/');
        const transformedUsers = response.map((user: any) => ({
          id: user.id,
          avatar: null, // Add avatar logic later if needed
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          city: user.city || 'N/A',
          mobile: user.mobile || 'N/A',
          lastActive: formatDate(user.last_login), // Format last login
          joined: formatDate(user.date_joined) // Format date joined
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const table = useAdvanceTable({
    data: users,
    columns: usersTableColumns, // Update table column reference
    pageSize: 10,
    pagination: true,
    sortable: true,
    selection: true
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div>
      <PageBreadcrumb items={userBreadcrumbItems} /> {/* Updated breadcrumb */}
      <div className="mb-9">
        <h2 className="mb-5">Users</h2>

        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <Row className="g-3">
              <Col xs="auto">
                <SearchBox
                  placeholder="Search users"
                  onChange={handleSearchInputChange}
                />
              </Col>
              <Col
                xs="auto"
                className="scrollbar overflow-hidden-y flex-grow-1"
              ></Col>
              <Col xs="auto">
                <Button variant="link" className="text-body me-4 px-0">
                  <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                  Export
                </Button>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Add user
                </Button>
              </Col>
            </Row>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            {isLoading ? <p>Loading...</p> : <UsersTable />}{' '}
            {/* Updated component */}
          </div>
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export default Users;
