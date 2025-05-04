// src/app/certificados/page.tsx
import React from 'react';
import CertificateGenerator from '../../components/certificates/CertificateGenerator';

export default function CertificatesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <CertificateGenerator />
    </div>
  );
}
