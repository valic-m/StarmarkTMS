// File: C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\settings\SettingsPage.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SETTINGS_OPTIONS = [
  {
    name: 'Customer Settings',
    path: '/settings/customers',
    requiredRole: 'admin'
  },
  {
    name: 'Driver Settings',
    path: '/settings/drivers',
    requiredRole: 'manager'
  }
  // Add more settings options here if needed
];

const SettingsPage: React.FC = () => {
  const { roles } = useAuth(); // Use the roles from the Auth context
  const navigate = useNavigate();

  // Filter settings based on user roles
  const visibleSettings = SETTINGS_OPTIONS.filter(option =>
    roles.includes(option.requiredRole)
  );

  return (
    <div>
      <h2>Settings</h2>
      <Row>
        {visibleSettings.map(setting => (
          <Col md={4} className="mb-4" key={setting.name}>
            <Card
              onClick={() => navigate(setting.path)} // Navigate to the specified path
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <h5>{setting.name}</h5>
                <p>Manage your {setting.name.toLowerCase()} here.</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SettingsPage;
