import React from 'react';
import { ConditionalLayout } from './ConditionalLayout.jsx';

export const LoggedLayout = ({ children }) => (
  <ConditionalLayout>{children}</ConditionalLayout>
);
