// pages/admin.tsx
import BarcodeScanner from '@/components/shared/BarcodeScanner';
import React from 'react';

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
      <BarcodeScanner />
    </div>
  );
};

export default AdminPage;
