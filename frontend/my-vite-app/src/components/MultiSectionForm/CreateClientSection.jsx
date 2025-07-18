import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Select from 'react-select';
import './CreateClientSection.css';

const CreateClientSection = ({ initialData,onContinue, onExit, onCancel, isEditable = false }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState(initialData ||{
    clientCode: '',
    clientName: '',
    clientCountry: null,
    launchDate: '',
    reinsurer: null,
    category: null,
    channel: null,
    freqBordereau: null,
    freqReport: null,
    accountingPrinciple: null,
    primaryCurrency: null,
    secondaryCurrency: null,
    taxProduct: null,
    monthlyReport: false
  });
  useEffect(() => {
  if (initialData) {
    setFormData({
    clientCode: initialData?.clientCode || '',
    clientName: initialData?.clientName || '',
    clientCountry: initialData?.clientCountry || '',
    launchDate: initialData?.launchDate || '',
    reinsurer: initialData?.reinsurer || '',
    category: initialData?.category || '',
    channel: initialData?.channel || '',
    freqBordereau: initialData?.freqBordereau || '',
    freqReport: initialData?.freqReport || '',
    accountingPrinciple: initialData?.accountingPrinciple || '',
    primaryCurrency: initialData?.primaryCurrency || '',
    secondaryCurrency: initialData?.secondaryCurrency || '',
    taxProduct: initialData?.taxProduct || '',
    monthlyReport: initialData?.monthlyReport || false
  });
  }
}, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    handleChange(name, type === 'checkbox' ? checked : value);
  };

  const handleContinue = () => onContinue(formData);
  const handleExit = () => onExit(formData);

  const handleCancel = () => {
    if (onCancel) onCancel();       // ✅ Existing behavior
    navigate('/dashboard');         // ✅ New behavior: redirect to dashboard
  };

  const countryOptions = [
    { label: 'India', value: 'IN' },
    { label: 'USA', value: 'US' },
    { label: 'UK', value: 'UK' },
  ];

  const reinsurerOptions = [
    { label: 'Sirius Re', value: 'sirius' },
    { label: 'Arch', value: 'arch' },
    { label: 'Axis', value: 'axis' },
    { label: 'No Risk', value: 'norisk' }
  ];

  const categoryOptions = [
    { label: 'Cat1', value: 'cat1' },
    { label: 'Cat2', value: 'cat2' },
    { label: 'Cat3', value: 'cat3' }
  ];

  const channelOptions = [
    { label: 'Wholesale', value: 'wholesale' },
    { label: 'Retail', value: 'retail' },
    { label: 'Employment Benefits', value: 'employment_benefits' }
  ];

  const frequencyOptions = [
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Semiannual', value: 'semiannual' },
    { label: 'Annual', value: 'annual' },
    { label: 'Daily', value: 'daily' }
  ];

  const accountingPrincipleOptions = [
    { label: 'Premium Charged', value: 'charged' },
    { label: 'Premium Earned', value: 'earned' },
    { label: 'Premium Accumulated', value: 'accumulated' }
  ];

  const currencyOptions = [
    { label: 'EUR', value: 'eur' },
    { label: 'RUB', value: 'rub' },
    { label: 'USD', value: 'usd' },
    { label: 'RON', value: 'ron' },
    { label: 'GBP', value: 'gbp' }
  ];

  const taxProductOptions = [
    { label: 'SERVICES VAT', value: 'services_vat' },
    { label: 'OTHER SERVICES', value: 'other_services' },
    { label: 'NO VAT SERVICES', value: 'no_vat_services' },
    { label: 'SERV EB NO IVA EXT', value: 'serv_eb_no_iva_ext' }
  ];

  return (
    <div className="form-container">
  <h2 className="form-title">Client Info</h2>

  <div className="form-grid">
    <div className="form-row">
      <label>Client Code*</label>
      <input
      type="text"
      name="clientCode"
      value={formData.clientCode}
      onChange={handleInputChange}
      disabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Client Name*</label>
      <input
      type="text"
      name="clientName"
      value={formData.clientName}
      onChange={handleInputChange}
      disabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Client Country*</label>
      <Select
        options={countryOptions}
        value={countryOptions.find(opt => opt.value === formData.clientCountry)}
        onChange={val => handleChange('clientCountry', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Launch Date*</label>
      <input
      type="date"
      name="launchDate"
      value={formData.launchDate}
      onChange={handleInputChange}
      disabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Reinsurer*</label>
      <Select
        options={reinsurerOptions}
        value={reinsurerOptions.find(opt => opt.value === formData.reinsurer)}
        onChange={val => handleChange('reinsurer', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Category</label>
      <Select
        options={categoryOptions}
        value={categoryOptions.find(opt => opt.value === formData.category)}
        onChange={val => handleChange('category', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Channel*</label>
      <Select
        options={channelOptions}
        value={channelOptions.find(opt => opt.value === formData.channel)}
        onChange={val => handleChange('channel', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Frequency Bordereau*</label>
      <Select
        options={frequencyOptions}
        value={frequencyOptions.find(opt => opt.value === formData.freqBordereau)}
        onChange={val => handleChange('freqBordereau', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Frequency Report*</label>
      <Select
        options={frequencyOptions}
        value={frequencyOptions.find(opt => opt.value === formData.freqReport)}
        onChange={val => handleChange('freqReport', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Accounting Principle*</label>
      <Select
        options={accountingPrincipleOptions}
        value={accountingPrincipleOptions.find(opt => opt.value === formData.accountingPrinciple)}
        onChange={val => handleChange('accountingPrinciple', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Primary Currency*</label>
      <Select
        options={currencyOptions}
        value={currencyOptions.find(opt => opt.value === formData.primaryCurrency)}
        onChange={val => handleChange('primaryCurrency', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Secondary Currency</label>
      <Select
        options={currencyOptions}
        value={currencyOptions.find(opt => opt.value === formData.secondaryCurrency)}
        onChange={val => handleChange('secondaryCurrency', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row">
      <label>Tax Product</label>
      <Select
        options={taxProductOptions}
        value={taxProductOptions.find(opt => opt.value === formData.taxProduct)}
        onChange={val => handleChange('taxProduct', val.value)}
        isDisabled={!isEditable}
      />
    </div>

    <div className="form-row checkbox-row">
      <label>Monthly Report</label>
      <input
      type="checkbox"
      name="monthlyReport"
      checked={formData.monthlyReport}
      onChange={handleInputChange}
      isDisabled={!isEditable}
      />
    </div>
  </div>

  <div className="form-buttons">
    <button className="btn blue" onClick={handleContinue}>Save & Continue</button>
    <button className="btn green" onClick={handleExit}>Save & Exit</button>
    <button className="btn gray" onClick={handleCancel}>Cancel</button>
  </div>
</div>
  );
};

export default CreateClientSection;
