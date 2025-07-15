import React, { useState } from 'react';
import './CreateDiscountSection.css';

const CreateDiscountSection = ({ clientData, productData, initialData, onExit, onCancel, onBack }) => {
  const [rows, setRows] = useState(initialData?.discounts?.length ? initialData.discounts : [
    { product: '', numberFrom: '', numberTo: '', discount: '' }
  ]);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { product: '', numberFrom: '', numberTo: '', discount: '' }]);
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleExitClick = () => {
    const fullData = {
      ...clientData,
      ...productData,
      discounts: rows,
    };
    console.log('Save & Exit from Discounts:', fullData);
    onExit(fullData);
  };

  return (
    <div className="discount-form-wrapper">
      <div className="discount-header">DISCOUNTS INFO</div>

      <div className="discount-container">
        <div className="form-title">Create Discounts</div>

        <div className="client-info">
          <span><strong>Client:</strong> {clientData?.clientName || 'N/A'}</span>
          <span><strong>Product:</strong> {productData?.productName || 'N/A'}</span>
        </div>

        <div className="discount-table">
          <div className="table-header">
            <div>Product</div>
            <div>Number From</div>
            <div>Number To</div>
            <div>Discount*</div>
          </div>

          {rows.map((row, index) => (
            <div key={index} className="table-row">
              <input
                type="text"
                value={row.product}
                onChange={(e) => handleRowChange(index, 'product', e.target.value)}
              />
              <input
                type="number"
                min="0"
                value={row.numberFrom}
                onChange={(e) => handleRowChange(index, 'numberFrom', e.target.value)}
              />
              <input
                type="number"
                min="0"
                value={row.numberTo}
                onChange={(e) => handleRowChange(index, 'numberTo', e.target.value)}
              />
              <input
                type="number"
                min="0"
                value={row.discount}
                onChange={(e) => handleRowChange(index, 'discount', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="table-buttons">
          <button onClick={handleAddRow}>Add row</button>
          <button onClick={handleRemoveRow}>Remove row</button>
        </div>

        <div className="form-buttons">
          <button className="btn primary" onClick={handleExitClick}>Save & Exit</button>
          <button className="btn secondary" onClick={onBack}>Back</button>
          <button className="btn secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscountSection;
