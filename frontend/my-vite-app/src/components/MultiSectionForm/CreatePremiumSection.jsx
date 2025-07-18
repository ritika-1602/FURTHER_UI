import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePremiumSection.css';

const CreatePremiumSection = ({ clientData, productData, initialData, onBack, onCancel, onContinue,isEditable=False }) => {
  const navigate = useNavigate();

  const [rows, setRows] = useState(
  Array.isArray(initialData?.rows) ? initialData.rows : [
    {
      effectiveDate: '',
      effectiveTo: '',
      ageFrom: '',
      ageTo: '',
      reinsurancePremium: '',
      riskPremium: '',
      furtherFees: '',
      comment: '',
      grossPremium: '',
      taxes: '',
      frontingFee: '',
      brokerage: '',
    }
  ]
);
  const [currency, setCurrency] = useState('EUR');

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        effectiveDate: '',
        effectiveTo: '',
        ageFrom: '',
        ageTo: '',
        reinsurancePremium: '',
        riskPremium: '',
        furtherFees: '',
        comment: '',
        grossPremium: '',
        taxes: '',
        frontingFee: '',
        brokerage: '',
      },
    ]);
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.pop();
      setRows(updatedRows);
    }
  };

  const handleExitClick = () => {
    const fullData = {
      ...clientData,
      ...productData,
      premiumRates: rows,
      currency,
    };
    console.log('Premium Data Submitted (Save & Exit):', fullData);
    navigate('/dashboard');
  };

  const handleContinueClick = () => {
    const fullData = {
      ...clientData,
      ...productData,
      premiumRates: rows,
      currency,
    };
    console.log('Premium Data Submitted (Save & Continue):', fullData);
    onContinue({ rows, currency }); // ✅ only send rows and currency
 // Proceed to next step (if integrated)
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="premium-form-wrapper">
  <div className="premium-header">PREMIUM RATES INFO</div>

  <div className="premium-container">
    <div className="form-title">Create Premium Rates</div>
    <div className="client-info">
      <span><strong>Client:</strong> {clientData?.clientName || 'N/A'}</span>
      <span><strong>Product:</strong> {productData?.productName || 'N/A'}</span>
    </div>

    <div className="currency-row">
      <label>Currency:</label>
      <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      disabled={!isEditable}>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
      <button className="btn small" onClick={handleAddRow} disabled={!isEditable}>Add row</button>
      <button className="btn small" onClick={handleRemoveRow} disabled={!isEditable}>Remove row</button>
    </div>

    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Effective Date*</th>
            <th>Effective To</th>
            <th>Age From*</th>
            <th>Age To*</th>
            <th>Reinsurance Premium*</th>
            <th>Risk Premium*</th>
            <th>Further Fees*</th>
            <th>Comment</th>
            <th>Gross Premium</th>
            <th>Taxes</th>
            <th>Fronting Fee</th>
            <th>Brokerage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, val]) => (
                <td key={key}>
                  <input
                    type={['effectiveDate', 'effectiveTo'].includes(key) ? 'date' : 'text'}
                    name={key}
                    value={val}
                    onChange={(e) => handleChange(index, e)}
                    disabled={!isEditable}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="form-buttons">
      <button className="btn primary" onClick={handleContinueClick}>Save & Continue</button>
      <button className="btn primary" onClick={handleExitClick}>Save & Exit</button>
      <button className="btn secondary" onClick={onBack}>Back</button>
      <button className="btn secondary" onClick={handleCancelClick}>Cancel</button>
    </div>
  </div>
</div>
  );
};

export default CreatePremiumSection;
