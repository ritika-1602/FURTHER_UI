import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import './CreateRetentionSection.css';

const CreateRetentionSection = ({ clientData, initialData, onContinue, onExit, onCancel, onBack }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState(initialData ||{
    effectiveDate: '',
    effectiveTo: '',
    retention: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExitClick = () => {
    const fullData = { ...clientData, ...formData };
    console.log('Save & Exit from Retention:', fullData);
    onExit(fullData); // 🔁 Redirects to dashboard
  };

  const handleContinueClick = () => {
    const fullData = { ...formData };
    console.log('Save & Continue from Retention:', fullData);
    onContinue(fullData); // 🔁 Goes to Premium section (Step 4)
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    navigate('/dashboard'); // ✅ Redirect to dashboard
  };

  return (
    <div className="retention-form-wrapper">
      <div className="retention-header">RETENTIONS INFO</div>

      <div className="retention-container">
        <div className="form-title">Create Retention</div>

        <div className="client-info">
          <span><strong>Client:</strong> {clientData?.clientName || 'N/A'}</span>
          <span><strong>Client Code:</strong> {clientData?.clientCode || 'N/A'}</span>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Effective Date*</label>
            <input
              type="date"
              name="effectiveDate"
              value={formData.effectiveDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Effective To</label>
            <input
              type="date"
              name="effectiveTo"
              value={formData.effectiveTo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Retention (%)*</label>
            <input
              type="number"
              name="retention"
              value={formData.retention}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button className="btn primary" onClick={handleContinueClick}>Save & Continue</button>
          <button className="btn primary" onClick={handleExitClick}>Save & Exit</button>
          <button className="btn secondary" onClick={onBack}>Back</button>
          <button className="btn secondary" onClick={handleCancelClick}>Cancel</button> {/* ✅ updated */}
        </div>
      </div>
    </div>
  );
};

export default CreateRetentionSection;
