import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../UserContext";

import CreateClientSection from './CreateClientSection';
import CreateProductSection from './CreateProductSection';
import CreateRetentionSection from './CreateRetentionSection';
import CreatePremiumSection from './CreatePremiumSection';
import CreateDiscountSection from './CreateDiscountSection';

const MultiSectionForm = ({ isEditMode = false, isCreateMode = false, initialData = {}, clientId = null }) => {
  const { userRole } = useContext(UserContext); // ✅ Live context value
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Pre-fill data if editing
  const [clientData, setClientData] = useState({});
  const [productData, setProductData] = useState({});
  const [retentionData, setRetentionData] = useState({});
  const [premiumData, setPremiumData] = useState({});
  const [discountData, setDiscountData] = useState({});

  // To keep all the update form sections pre-filled, whether editable or not
  useEffect(() => {
  if (isEditMode && initialData && !clientData.clientCode) {
    // Only populate once: prevent re-running on every render
    setClientData({
      clientCode: initialData.clientCode || '',
      clientName: initialData.clientName || '',
      clientCountry: initialData.clientCountry || '',
      launchDate: initialData.launchDate || '',
      reinsurer: initialData.reinsurer || '',
      category: initialData.category || '',
      channel: initialData.channel || '',
      freqBordereau: initialData.freqBordereau || '',
      freqReport: initialData.freqReport || '',
      accountingPrinciple: initialData.accountingPrinciple || '',
      primaryCurrency: initialData.primaryCurrency || '',
      secondaryCurrency: initialData.secondaryCurrency || '',
      taxProduct: initialData.taxProduct || '',
      monthlyReport: initialData.monthlyReport || false,
    });

    setProductData({
      productName: initialData.productName || '',
      productCatalogueId: initialData.productCatalogueId || '',
      comments: initialData.comments || '',
      productType: initialData.productType || '',
      house: initialData.house || '',
    });

    setRetentionData({
      effectiveDate: initialData.effectiveDate || '',
      effectiveTo: initialData.effectiveTo || '',
      retention: initialData.retention || '',
    });

    setPremiumData({
      premiumRates: initialData.premiumRates || [],
      premiumCurrency: initialData.premiumCurrency || 'EUR',
    });

    setDiscountData({
      discounts: initialData.discounts || [],
    });
  }
}, [isEditMode, initialData, clientData.clientCode]);

  // STEP HANDLERS
  const handleContinueFromCreateClient = (data) => {
    setClientData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleContinueFromProduct = (data) => {
    setProductData(data);
    setStep(3);
  };

  const handleContinueFromRetention = (data) => {
    setRetentionData(data);
    setStep(4);
  };

  const handleContinueFromPremium = (data) => {
    setPremiumData(prev => ({ ...prev, ...data }));
    setStep(5);
  };

  // FINAL SUBMIT HANDLER (POST or PUT)
  const handleExitFromDiscount = async (data) => {
    const fullData = {
      ...clientData,
      ...productData,
      ...retentionData,
      ...premiumData,
      ...data,
    };

    try {
      const url = isEditMode
        ? `http://127.0.0.1:8000/api/auth/clients/${clientId}/`
        : `http://127.0.0.1:8000/api/auth/clients/`;

      const method = isEditMode ? axios.put : axios.post;
      const response = await method(url, fullData);

      alert(isEditMode ? "Client updated successfully!" : "Client created successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit client data.");
    }
  };

  // Exit, Cancel, Back
  const handleExit = (data) => navigate('/dashboard');
  const handleCancel = () => navigate('/dashboard');

  const handleBackToClient = () => setStep(1);
  const handleBackToProduct = () => setStep(2);
  const handleBackToRetention = () => setStep(3);
  const handleBackToPremium = () => setStep(4);

  // TAB SELECTOR (Only in Edit Mode)
  const renderTabSelector = () => (
    <div className="mb-6 flex gap-4">
      <label><strong>Go to section:</strong></label>
      <select value={step} onChange={(e) => setStep(Number(e.target.value))}>
        <option value={1}>Client Info</option>
        <option value={2}>Product Info</option>
        <option value={3}>Retention Info</option>
        <option value={4}>Premium Info</option>
        <option value={5}>Discount Info</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {isEditMode && renderTabSelector()}

      {step === 1 && (
        <CreateClientSection
          initialData={clientData}
          onContinue={handleContinueFromCreateClient}
          onExit={handleExit}
          onCancel={handleCancel}
          isEditable={isCreateMode || userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
        />
      )}
      {step === 2 && (
        <CreateProductSection
          clientData={clientData}
          initialData={productData}
          onContinue={handleContinueFromProduct}
          onExit={handleExit}
          onCancel={handleCancel}
          onBack={handleBackToClient}
          isEditable={isCreateMode || userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
        />
      )}
      {step === 3 && (
        <CreateRetentionSection
          clientData={clientData}
          initialData={retentionData}
          onContinue={handleContinueFromRetention}
          onExit={handleExit}
          onCancel={handleCancel}
          onBack={handleBackToProduct}
          isEditable={isCreateMode || userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
        />
      )}
      {step === 4 && (
        <CreatePremiumSection
          clientData={clientData}
          productData={productData}
          initialData={premiumData}
          onContinue={handleContinueFromPremium}
          onExit={handleExit}
          onCancel={handleCancel}
          onBack={handleBackToRetention}
          isEditable={isCreateMode || userRole === 'Admin' || userRole === 'Finance'}       // for restricted access
        />
      )}
      {step === 5 && (
        <CreateDiscountSection
          clientData={clientData}
          productData={productData}
          premiumData={premiumData}
          initialData={discountData}
          onExit={handleExitFromDiscount}
          onCancel={handleCancel}
          onBack={handleBackToPremium}
          isEditable={isCreateMode || userRole === 'Admin' || userRole === 'Finance'}       // for restricted access
        />
      )}
    </div>
  );
};

export default MultiSectionForm;