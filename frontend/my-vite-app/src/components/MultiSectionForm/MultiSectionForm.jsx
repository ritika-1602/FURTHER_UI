// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import CreateClientSection from './CreateClientSection';
// import CreateProductSection from './CreateProductSection';
// import CreateRetentionSection from './CreateRetentionSection';
// import CreatePremiumSection from './CreatePremiumSection';
// import CreateDiscountSection from './CreateDiscountSection';

// const MultiSectionForm = () => {
//   const [step, setStep] = useState(1);
//   const [clientData, setClientData] = useState({});
//   const [productData, setProductData] = useState({});
//   const [retentionData, setRetentionData] = useState({});
//   const [premiumData, setPremiumData] = useState({});
//   const navigate = useNavigate();

//   // --- Step 1 ---
//   const handleContinueFromCreateClient = (data) => {
//     setClientData(prev => ({ ...prev, ...data }));
//     setStep(2);
//   };

//   const handleExit = (data) => {
//     const fullData = { ...clientData, ...data };
//     console.log('Save & Exit with data:', fullData);
//     navigate('/dashboard');
//   };

//   const handleCancel = () => {
//     console.log('User canceled form.');
//     navigate('/dashboard');
//   };

//   const handleBackToClient = () => {
//     setStep(1);
//   };

//   // --- Step 2 ---
//   const handleContinueFromProduct = (data) => {
//     setProductData(data);
//     setStep(3);
//   };

//   const handleExitFromProduct = (data) => {
//     const fullData = { ...clientData, ...data };
//     console.log('Save & Exit from Product:', fullData);
//     navigate('/dashboard');
//   };

//   const handleBackToProduct = () => {
//     setStep(2);
//   };

//   // --- Step 3 ---
//   const handleContinueFromRetention = (data) => {
//     setRetentionData(data);
//     console.log('Step 3 data collected:', data);
//     setStep(4);
//   };

//   const handleExitFromRetention = (data) => {
//     const fullData = { ...clientData, ...productData, ...data };
//     console.log('Final submission from Retention:', fullData);
//     navigate('/dashboard');
//   };

//   const handleBackToRetention = () => {
//     setStep(3);
//   };

//   // --- Step 4 ---
//   const handleContinueFromPremium = (data) => {
//   setPremiumData(prev => ({ ...prev, ...data }));
//   setStep(5);
// };

//   const handleExitFromPremium = (data) => {
//     const fullData = { ...clientData, ...productData, ...retentionData, ...data };
//     console.log('Exit from Premium Section:', fullData);
//     navigate('/dashboard');
//   };

//   const handleBackToPremium = () => {
//     setStep(4);
//   };

//   // --- Step 5 ---
//   const handleExitFromDiscount = (data) => {
//     const fullData = {
//       ...clientData,
//       ...productData,
//       ...retentionData,
//       ...premiumData,
//       ...data,
//     };
//     console.log('Final full data from Discount Section:', fullData);
//     navigate('/dashboard');
//   };

//   const handleBackToDiscount = () => {
//     setStep(4);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       {step === 1 && (
//         <CreateClientSection
//           initialData={clientData}
//           onContinue={handleContinueFromCreateClient}
//           onExit={handleExit}
//           onCancel={handleCancel}
//         />
//       )}

//       {step === 2 && (
//         <CreateProductSection
//           clientData={clientData}
//           initialData={productData}
//           onContinue={handleContinueFromProduct}
//           onExit={handleExitFromProduct}
//           onCancel={handleCancel}
//           onBack={handleBackToClient}
//         />
//       )}

//       {step === 3 && (
//         <CreateRetentionSection
//           clientData={clientData}
//           initialData={retentionData}
//           onContinue={handleContinueFromRetention}
//           onExit={handleExitFromRetention}
//           onCancel={handleCancel}
//           onBack={handleBackToProduct}
//         />
//       )}

//       {step === 4 && (
//         <CreatePremiumSection
//           clientData={clientData}
//           productData={productData}
//           initialData={premiumData}
//           onContinue={handleContinueFromPremium}
//           onExit={handleExitFromPremium}
//           onCancel={handleCancel}
//           onBack={handleBackToRetention}
//         />
//       )}

//       {step === 5 && (
//         <CreateDiscountSection
//           clientData={clientData}
//           productData={productData}
//           premiumData={premiumData}
//           onExit={handleExitFromDiscount}
//           onCancel={handleCancel}
//           onBack={handleBackToDiscount}
//         />
//       )}
//     </div>
//   );
// };

// export default MultiSectionForm;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CreateClientSection from './CreateClientSection';
import CreateProductSection from './CreateProductSection';
import CreateRetentionSection from './CreateRetentionSection';
import CreatePremiumSection from './CreatePremiumSection';
import CreateDiscountSection from './CreateDiscountSection';

const MultiSectionForm = ({ isEditMode = false, initialData = {}, clientId = null, userRole }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Pre-fill data if editing
  const [clientData, setClientData] = useState({});
  const [productData, setProductData] = useState({});
  const [retentionData, setRetentionData] = useState({});
  const [premiumData, setPremiumData] = useState({});
  const [discountData, setDiscountData] = useState({});

  useEffect(() => {
    if (isEditMode && initialData) {
      const {
        clientCode, clientName, clientCountry, launchDate, reinsurer,
        category, channel, freqBordereau, freqReport, accountingPrinciple,
        primaryCurrency, secondaryCurrency, taxProduct, monthlyReport,
        productName, productCatalogueId, comments, productType, house,
        effectiveDate, effectiveTo, retention,
        premiumRates, premiumCurrency,
        discounts
      } = initialData;

      setClientData({
        clientCode, clientName, clientCountry, launchDate, reinsurer,
        category, channel, freqBordereau, freqReport, accountingPrinciple,
        primaryCurrency, secondaryCurrency, taxProduct, monthlyReport,
      });

      setProductData({
        productName, productCatalogueId, comments, productType, house,
      });

      setRetentionData({
        effectiveDate, effectiveTo, retention,
      });

      setPremiumData({
        premiumRates, premiumCurrency,
      });

      setDiscountData({
        discounts,
      });
    }
  }, [isEditMode, initialData]);

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
          isEditable={userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
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
          isEditable={userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
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
          isEditable={userRole === 'Admin' || userRole === 'Technical'}       // for restricted access
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
          isEditable={userRole === 'Admin' || userRole === 'Finance'}       // for restricted access
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
          isEditable={userRole === 'Admin' || userRole === 'Finance'}       // for restricted access
        />
      )}
    </div>
  );
};

export default MultiSectionForm;