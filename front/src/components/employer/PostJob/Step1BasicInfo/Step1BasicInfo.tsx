import React from 'react';
import { CategoriaVacante } from '../../../../types/categoriaVacante';

interface Step1Props {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({ formData, onChange }) => {
  return (
    <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
      <h2 className="h5 fw-bold text-dark mb-4">Basic information</h2>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">
          Job title <span className="text-teal">*</span>
        </label>
        <span className="d-block text-muted extra-small mb-2">
          Be specific. 'Event Setup Crew' performs better than 'Helper Needed'.
        </span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="e.g. Warehouse Picker & Packer"
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold text-dark small mb-1">
          Category <span className="text-teal">*</span>
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={onChange}
          className="form-select bg-light border-0 py-2.5 px-3 rounded-3 text-dark small"
        >
          <option value="">Select a category</option>

          {Object.values(CategoriaVacante).map((categoria) => (
            <option key={categoria.value} value={categoria.value}>
              {categoria.text}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label fw-semibold text-dark small mb-1">
          Job description <span className="text-teal">*</span>
        </label>
        <span className="d-block text-muted extra-small mb-2">
          Describe tasks, environment, and expectations. Workers use this to decide if they are a good fit.
        </span>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={onChange}
          placeholder="Describe the role, daily tasks, work environment, and any other details workers should know..."
          className="form-control bg-light border-0 py-2.5 px-3 rounded-3 text-dark small resize-none"
        />
      </div>
    </div>
  );
};