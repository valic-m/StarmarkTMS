import { Icon } from '@iconscout/react-unicons';
import React from 'react';

export interface Route {
  name: string;
  icon?: string | React.ElementType; // Allow string or React components for icons
  // other fields
}
