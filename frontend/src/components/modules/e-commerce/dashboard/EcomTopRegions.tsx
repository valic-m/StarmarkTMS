import EcomTopRegionsTable from 'components/tables/EcomTopRegionsTable';
import React from 'react';

const EcomTopRegions = () => {
  return (
    <>
      <div className="mb-5 mt-7">
        <h3> Top Loads by State</h3>
        <p className="text-body-tertiary"> Top Shippers & Receivers</p>
      </div>
      <EcomTopRegionsTable />
    </>
  );
};

export default EcomTopRegions;
