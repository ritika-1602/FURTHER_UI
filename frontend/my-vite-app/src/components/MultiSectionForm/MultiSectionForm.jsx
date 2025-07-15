import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateClientSection from './CreateClientSection';
import CreateProductSection from './CreateProductSection';
import CreateRetentionSection from './CreateRetentionSection';
import CreatePremiumSection from './CreatePremiumSection';
import CreateDiscountSection from './CreateDiscountSection';

const MultiSectionForm = () => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({});
  const [productData, setProductData] = useState({});
  const [retentionData, setRetentionData] = useState({});
  const [premiumData, setPremiumData] = useState({});
  const navigate = useNavigate();

  // --- Step 1 ---
  const handleContinueFromCreateClient = (data) => {
    setClientData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleExit = (data) => {
    const fullData = { ...clientData, ...data };
    console.log('Save & Exit with data:', fullData);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    console.log('User canceled form.');
    navigate('/dashboard');
  };

  const handleBackToClient = () => {
    setStep(1);
  };

  // --- Step 2 ---
  const handleContinueFromProduct = (data) => {
    setProductData(data);
    setStep(3);
  };

  const handleExitFromProduct = (data) => {
    const fullData = { ...clientData, ...data };
    console.log('Save & Exit from Product:', fullData);
    navigate('/dashboard');
  };

  const handleBackToProduct = () => {
    setStep(2);
  };

  // --- Step 3 ---
  const handleContinueFromRetention = (data) => {
    setRetentionData(data);
    console.log('Step 3 data collected:', data);
    setStep(4);
  };

  const handleExitFromRetention = (data) => {
    const fullData = { ...clientData, ...productData, ...data };
    console.log('Final submission from Retention:', fullData);
    navigate('/dashboard');
  };

  const handleBackToRetention = () => {
    setStep(3);
  };

  // --- Step 4 ---
  const handleContinueFromPremium = (data) => {
  setPremiumData(prev => ({ ...prev, ...data }));
  setStep(5);
};

  const handleExitFromPremium = (data) => {
    const fullData = { ...clientData, ...productData, ...retentionData, ...data };
    console.log('Exit from Premium Section:', fullData);
    navigate('/dashboard');
  };

  const handleBackToPremium = () => {
    setStep(4);
  };

  // --- Step 5 ---
  const handleExitFromDiscount = (data) => {
    const fullData = {
      ...clientData,
      ...productData,
      ...retentionData,
      ...premiumData,
      ...data,
    };
    console.log('Final full data from Discount Section:', fullData);
    navigate('/dashboard');
  };

  const handleBackToDiscount = () => {
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {step === 1 && (
        <CreateClientSection
          initialData={clientData}
          onContinue={handleContinueFromCreateClient}
          onExit={handleExit}
          onCancel={handleCancel}
        />
      )}

      {step === 2 && (
        <CreateProductSection
          clientData={clientData}
          initialData={productData}
          onContinue={handleContinueFromProduct}
          onExit={handleExitFromProduct}
          onCancel={handleCancel}
          onBack={handleBackToClient}
        />
      )}

      {step === 3 && (
        <CreateRetentionSection
          clientData={clientData}
          initialData={retentionData}
          onContinue={handleContinueFromRetention}
          onExit={handleExitFromRetention}
          onCancel={handleCancel}
          onBack={handleBackToProduct}
        />
      )}

      {step === 4 && (
        <CreatePremiumSection
          clientData={clientData}
          productData={productData}
          initialData={premiumData}
          onContinue={handleContinueFromPremium}
          onExit={handleExitFromPremium}
          onCancel={handleCancel}
          onBack={handleBackToRetention}
        />
      )}

      {step === 5 && (
        <CreateDiscountSection
          clientData={clientData}
          productData={productData}
          premiumData={premiumData}
          onExit={handleExitFromDiscount}
          onCancel={handleCancel}
          onBack={handleBackToDiscount}
        />
      )}
    </div>
  );
};

export default MultiSectionForm;
