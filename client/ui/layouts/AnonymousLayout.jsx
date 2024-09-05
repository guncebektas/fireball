import React from 'react';
import {ConditionalLayout} from './ConditionalLayout.jsx';

export const AnonymousLayout = ({ children }) => (
  <ConditionalLayout>{children}</ConditionalLayout>
);
