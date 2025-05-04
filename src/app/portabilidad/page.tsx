// src/app/portabilidad/page.tsx
import React from 'react';
import { PortabilityProvider } from '../../components/portability/PortabilityContext';
import PortabilityDashboard from '../../components/portability/PortabilityDashboard';

export default function PortabilityPage() {
  return (
    <PortabilityProvider>
      <div className="container mx-auto py-8 px-4">
        <PortabilityDashboard />
      </div>
    </PortabilityProvider>
  );
}
