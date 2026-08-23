import React, { useState } from 'react';
import { StepProgressBar } from '../../../components/employer/PostJob/StepProgressBar/StepProgressBar';
import { Step1BasicInfo } from '../../../components/employer/PostJob/Step1BasicInfo/Step1BasicInfo';
import { Step2PayLocation } from '../../../components/employer/PostJob/Step2PayLocation/Step2PayLocation';
import { Step3ScheduleCapacity } from '../../../components/employer/PostJob/Step3ScheduleCapacity/Step3ScheduleCapacity';
import { Step4RequirementsSkills } from '../../../components/employer/PostJob/Step4RequirementsSkills/Step4RequirementsSkills';
import { useNotification } from '../../../context/NotificationContext/NotificationContext';

export const PostJob: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    payRate: '',
    payType: 'Hourly',
    location: '',
    isRemote: false,
    startDate: '',
    workersNeeded: 1,
    schedule: '',
    expectedDuration: '',
    requirements: '',
    skills: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // Detiene el submit accidental del formulario
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldNames: Record<string, string> = {
      title: 'Título',
      category: 'Categoría',
      description: 'Descripción',
      payRate: 'Tarifa de pago',
      payType: 'Tipo de pago',
      location: 'Ubicación',
      startDate: 'Fecha de inicio',
      workersNeeded: 'Número de trabajadores',
      schedule: 'Horario',
      expectedDuration: 'Duración esperada',
      requirements: 'Requisitos',
      skills: 'Habilidades',
    };

    // Validar campos vacíos
    const emptyField = Object.entries(formData).find(([key, value]) => {
      if (typeof value === 'string') {
        return value.trim() === '';
      }

      return value === null || value === undefined;
    });

    if (emptyField) {
      const [field] = emptyField;

      showNotification({
        type: 'error',
        title: 'Datos Incompletos',
        description: `El campo "${fieldNames[field] || field}" es obligatorio.`
      });

      return;
    }

    // Validar número de trabajadores
    if (formData.workersNeeded <= 0) {
      showNotification({
        type: 'error',
        title: 'Datos Incompletos',
        description: 'El número de trabajadores debe ser mayor que 0.',
      });


      return;
    }

    // Solo permite enviar si estamos en el paso final (Paso 4)
    if (currentStep === 4) {
      setIsPosted(true);
      console.log(formData);
    }
  };

  if (isPosted) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3">
        <div className="text-center max-w-md w-100">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{ fontSize: '2.5rem', color: '#0b9982' }}
          >
            ✓
          </div>
          <h1 className="h3 fw-bold text-dark mb-2">Job posted!</h1>
          <p className="text-muted small mb-4">
            Your job is now live. Qualified workers will start applying within minutes.
          </p>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <a
              href="/employer/applications"
              className="btn text-white px-4 py-2.5 fw-semibold rounded-3 extra-small"
              style={{ backgroundColor: '#0f172a' }}
            >
              View applications
            </a>
            <a
              href="/employer"
              className="btn btn-outline-secondary px-4 py-2.5 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light d-flex flex-column py-5 px-3">
      <div className="container max-w-2xl mx-auto">
        <header className="mb-4 text-start">
          <h1 className="h3 fw-bold text-dark mb-1">Post a job</h1>
          <p className="text-muted small mb-0">
            Tell workers what you need. The clearer your posting, the better your applicants.
          </p>
        </header>

        <StepProgressBar currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Step1BasicInfo formData={formData} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <Step2PayLocation formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3ScheduleCapacity formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Step4RequirementsSkills formData={formData} onChange={handleChange} />
          )}

          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-outline-secondary px-4 py-2 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
                >
                  ← Back
                </button>
              )}
            </div>

            <div className="d-flex align-items-center gap-3">
              <a
                href="/employer"
                className="text-muted text-decoration-none extra-small fw-semibold"
              >
                Cancel
              </a>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn text-white px-4 py-2 fw-semibold rounded-3 extra-small"
                  style={{ backgroundColor: '#0f172a' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn text-white px-4 py-2 fw-semibold rounded-3 extra-small"
                  style={{ backgroundColor: '#0b9982' }}
                >
                  Post job
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};