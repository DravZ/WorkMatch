import React from 'react';

interface Step4Props {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  companyName?: string;
}

export const Step4RequirementsSkills: React.FC<Step4Props> = ({
  formData,
  onChange,
  companyName = 'Metro Logistics Co.',
}) => {
  return (
    <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
      <h2 className="h5 fw-bold text-dark mb-4">Requirements & skills</h2>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">Requirements</label>
        <span className="d-block text-muted extra-small mb-2">
          List certifications, physical requirements, dress code, or equipment workers must have.
        </span>
        <textarea
          name="requirements"
          rows={3}
          value={formData.requirements}
          onChange={onChange}
          placeholder="e.g. Must be able to lift 25kg&#10;Steel-toed boots required&#10;Valid driver's license"
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">Preferred skills</label>
        <span className="d-block text-muted extra-small mb-2">Separate skills with commas.</span>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={onChange}
          placeholder="e.g. Forklift certified, Inventory management, RF scanner"
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        />
      </div>

      {/* Live Preview Box */}
      <div className="bg-light p-3 rounded-3 border">
        <span
          className="d-block text-uppercase extra-small fw-bold mb-2"
          style={{ color: '#94a3b8', letterSpacing: '0.05em' }}
        >
          PREVIEW
        </span>
        <div className="fw-bold text-dark small">{formData.title || 'Job title preview'}</div>
        <div className="text-muted extra-small">
          {companyName} · {formData.location || 'Location'}
        </div>
        <div className="text-dark extra-small mt-1 fw-semibold">
          ${formData.payRate || 0}/{formData.payType === 'Hourly' ? 'hr' : 'fixed'}
        </div>
      </div>
    </div>
  );
};