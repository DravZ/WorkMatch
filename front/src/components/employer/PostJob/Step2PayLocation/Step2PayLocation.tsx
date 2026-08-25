import React from 'react';

interface Step2Props {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Step2PayLocation: React.FC<Step2Props> = ({ formData, onChange }) => {
  return (
    <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
      <h2 className="h5 fw-bold text-dark mb-4">Pay & location</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <label className="form-label fw-semibold text-dark small mb-1">
            Pay rate <span className="text-teal">*</span>
          </label>
          <input
            type="number"
            name="payRate"
            value={formData.payRate}
            onChange={onChange}
            placeholder="0"
            className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-semibold text-dark small mb-1">Pay type</label>
          <select
            name="payType"
            value={formData.payType}
            onChange={onChange}
            className="form-select bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
          >
            <option value="Hourly">Hourly</option>
            <option value="Fixed">Fixed Rate</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">
          Work location <span className="text-teal">*</span>
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          placeholder="e.g. 123 Atlantic Ave, Brooklyn, NY 11201"
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        />
      </div>

      
      <div className="form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          id="isRemote"
          name="isRemote"
          checked={formData.isRemote}
          onChange={onChange}
          className="form-check-input rounded-1"
        />
        <label htmlFor="isRemote" className="form-check-label text-dark small cursor-pointer">
          This work is urgent.
        </label>
      </div>
    </div>
  );
};