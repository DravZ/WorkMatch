import React from 'react';

interface Step3Props {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Step3ScheduleCapacity: React.FC<Step3Props> = ({ formData, onChange }) => {
  return (
    <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
      <h2 className="h5 fw-bold text-dark mb-4">Schedule & capacity</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold text-dark small mb-1">
            Start date <span className="text-teal">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold text-dark small mb-1">
            Number of workers needed
          </label>
          <input
            type="number"
            name="workersNeeded"
            min="1"
            value={formData.workersNeeded}
            onChange={onChange}
            className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">
          Schedule <span className="text-teal">*</span>
        </label>
        <input
          type="text"
          name="schedule"
          value={formData.schedule}
          onChange={onChange}
          placeholder="e.g. Mon–Fri, 7am–3pm or Sat only, 8am–12pm"
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        />
      </div>

      <div className="mb-2">
        <label className="form-label fw-semibold text-dark small mb-1">Expected duration</label>
        <select
          name="expectedDuration"
          value={formData.expectedDuration}
          onChange={onChange}
          className="form-select bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        >
          <option value="">Select duration</option>
          <option value="1_day">Single day</option>
          <option value="1_week">1 Week</option>
          <option value="multi_week">Multiple weeks</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>
    </div>
  );
};