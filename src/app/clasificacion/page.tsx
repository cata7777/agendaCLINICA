// src/app/clasificacion/page.tsx
import React from 'react';
import DiagnosisClassification from '../../components/classification/DiagnosisClassification';

export default function ClassificationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <DiagnosisClassification />
    </div>
  );
}
