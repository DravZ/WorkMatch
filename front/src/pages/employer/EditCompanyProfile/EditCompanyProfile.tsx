import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanySector, type CompanyProfileForm } from './CompanySector';
import { useUser } from '../../../context/UserContext/UserContext';
import { useEmpresaController } from '../../../controllers/empresas.controller';
import styles from './EditCompanyProfile.module.css';

interface UpdateEmpresaData {
  nombre_empresa: string;
  sector: string;
  ubicacion: string;
  sitio_web: string;
  logo_url: string;
  descripcion: string;
}

interface FormErrors {
  companyName?: string;
  companySector?: string;
  location?: string;
  website?: string;
  about?: string;
}

export const EditCompanyProfile: React.FC = () => {
  const navigate = useNavigate();
  const empresaController = useEmpresaController();
  const { user } = useUser();
  const companyId = user?.empresaId;

  const [formData, setFormData] = useState<CompanyProfileForm>({
    companyName: '',
    companySector: CompanySector.OTHER,
    location: '',
    website: '',
    about: '',
  });

  const [logoUrl, setLogoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleRedirect = () => {
    navigate('/employer/company-profile');
  };

  // 1️⃣ CARGA DE DATOS (Arreglado: solo depende de companyId)
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) return;

      try {
        setIsLoading(true);
        setFetchError(null);

        const empresaData = await empresaController.getById(companyId);

        if (empresaData) {
          setLogoUrl(empresaData.logo_url || '');
          setFormData({
            companyName: empresaData.nombre_empresa || '',
            companySector: empresaData.sector == "" || !empresaData.sector ? CompanySector.OTHER : empresaData.sector,
            location: empresaData.ubicacion || '',
            website: empresaData.sitio_web || '',
            about: empresaData.descripcion || '',
          });
        }
      } catch (err) {
        setFetchError('Error loading company profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  // 2️⃣ VALIDACIONES
  const validate = (data: CompanyProfileForm): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
    } else if (data.companyName.trim().length < 2) {
      newErrors.companyName = 'Must be at least 2 characters.';
    }

    if (!data.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    if (!data.companySector) {
      newErrors.companySector = 'Please select a sector.';
    }

    if (data.website.trim()) {
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
      );
      if (!urlPattern.test(data.website)) {
        newErrors.website = 'Please enter a valid URL (e.g., https://example.com).';
      }
    }

    if (!data.about.trim()) {
      newErrors.about = 'About section is required.';
    } else if (data.about.trim().length < 20) {
      newErrors.about = 'Description must be at least 20 characters long.';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 3️⃣ ENVÍO Y ACTUALIZACIÓN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!companyId) {
      alert('Company ID is missing.');
      return;
    }

    try {
      setIsSubmitting(true);

      const updatePayload: UpdateEmpresaData = {
        nombre_empresa: formData.companyName.trim(),
        sector: formData.companySector,
        ubicacion: formData.location.trim(),
        sitio_web: formData.website.trim(),
        logo_url: logoUrl,
        descripcion: formData.about.trim(),
      };

      console.log('✅ Payload para guardar:', updatePayload);

      await empresaController.update(companyId, updatePayload);
      handleRedirect();
    } catch (err) {
      alert('An error occurred while saving changes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.centerState}>
        <div className="spinner-border text-teal" style={{ color: '#0b9982' }} role="status">
          <span className="visually-hidden">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.centerState}>
        <div className="text-center p-4 bg-white rounded-4 shadow-sm">
          <p className="text-danger mb-3">{fetchError}</p>
          <button className="btn btn-dark btn-sm" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.contentContainer}>
        
        <button type="button" onClick={handleRedirect} className={styles.backButton}>
          ← Back to profile
        </button>

        <h1 className={styles.title}>Edit company profile</h1>
        <p className={styles.subtitle}>
          Changes are saved to your profile and visible to workers who view it.
        </p>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>
            
            {/* COMPANY NAME */}
            <div className={styles.formGroup}>
              <label htmlFor="companyName" className={styles.fieldLabel}>
                COMPANY NAME
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.companyName ? styles.inputError : ''}`}
              />
              {errors.companyName && <div className={styles.errorMessage}>{errors.companyName}</div>}
            </div>

            {/* COMPANY SECTOR */}
            <div className={styles.formGroup}>
              <label htmlFor="companySector" className={styles.fieldLabel}>
                COMPANY SECTOR
              </label>
              <select
                id="companySector"
                name="companySector"
                value={formData.companySector}
                onChange={handleChange}
                className={`${styles.selectField} ${errors.companySector ? styles.inputError : ''}`}
              >
                {Object.values(CompanySector).map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
              {errors.companySector && <div className={styles.errorMessage}>{errors.companySector}</div>}
            </div>

            {/* LOCATION */}
            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.fieldLabel}>
                LOCATION
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.location ? styles.inputError : ''}`}
              />
              {errors.location && <div className={styles.errorMessage}>{errors.location}</div>}
            </div>

            {/* WEBSITE */}
            <div className={styles.formGroup}>
              <label htmlFor="website" className={styles.fieldLabel}>
                WEBSITE
              </label>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.website ? styles.inputError : ''}`}
              />
              {errors.website && <div className={styles.errorMessage}>{errors.website}</div>}
            </div>

            {/* ABOUT YOUR COMPANY */}
            <div className={styles.formGroup}>
              <label htmlFor="about" className={styles.fieldLabel}>
                ABOUT YOUR COMPANY
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                className={`${styles.textareaField} ${errors.about ? styles.inputError : ''}`}
              />
              {errors.about && <div className={styles.errorMessage}>{errors.about}</div>}
            </div>

            {/* ACTIONS */}
            <div className={styles.actionsRow}>
              <button
                type="button"
                onClick={handleRedirect}
                disabled={isSubmitting}
                className={styles.btnCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.btnSubmit}
              >
                {isSubmitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                Save changes
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};