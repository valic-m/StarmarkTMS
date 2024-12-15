// File: wrappers/PublicLayout.tsx
import React from 'react';
import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <div className="bg-body-emphasis">
      <DefaultLandingNavbar />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
