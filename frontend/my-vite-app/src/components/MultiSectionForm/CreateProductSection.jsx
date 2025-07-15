import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import './CreateProductSection.css';

const CreateProductSection = ({ onContinue, onExit, initialData, onCancel, onBack, clientData }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState(initialData ||{
    productName: '',
    productCatalogueId: '',
    comments: '',
    productType: 'Standard',
    house: 'Yes',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    navigate('/dashboard'); // ✅ Redirect to dashboard
  };

  return (
    <div className="product-form-wrapper">
      <div className="product-header">PRODUCT INFO</div>

      <div className="product-container">
        <div className="form-title">Create Product</div>

        <div className="client-info">
          <span><strong>Client:</strong> {clientData?.clientName || 'N/A'}</span>
          <span><strong>Client Code:</strong> {clientData?.clientCode || 'N/A'}</span>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Product Catalogue ID*</label>
            <input
              type="text"
              name="productCatalogueId"
              value={formData.productCatalogueId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Comments</label>
            <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Product Type*</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="Standard">Standard</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div className="form-group">
            <label>House*</label>
            <select
              name="house"
              value={formData.house}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="form-buttons">
          <button className="btn primary" onClick={() => onContinue(formData)}>Save & Continue</button>
          <button className="btn primary" onClick={() => onExit(formData)}>Save & Exit</button>
          <button className="btn secondary" onClick={onBack}>Back</button>
          <button className="btn secondary" onClick={handleCancelClick}>Cancel</button> {/* ✅ updated */}
        </div>
      </div>
    </div>
  );
};

export default CreateProductSection;
