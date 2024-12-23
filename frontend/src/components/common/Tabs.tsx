import React from 'react';

// Define the props interface
interface TabsProps {
  children: React.ReactNode;
}

// Tabs component with typed props
const Tabs: React.FC<TabsProps> = ({ children }) => (
  <div className="tabs-container">{children}</div>
);

export default Tabs;
