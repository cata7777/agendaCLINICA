// src/app/recetas-electronicas/page.tsx
import React from 'react';
import ElectronicPrescriptionSystem from '../../components/prescriptions/ElectronicPrescriptionSystem';

export default function ElectronicPrescriptionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <ElectronicPrescriptionSystem />
    </div>
  );
}
