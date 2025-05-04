// src/app/pagos/page.tsx
import React from 'react';
import WebpayIntegration from '../../components/payments/WebpayIntegration';

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <WebpayIntegration />
    </div>
  );
}
