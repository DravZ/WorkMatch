import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriaVacante } from '../../../types/categoriaVacante';
import styles from './EditWorkerProfile.module.css';
import { useHabilidadController } from '../../../controllers/habilidad.controller';
import { useUser } from '../../../context/UserContext/UserContext';
import { useUsuarioController } from '../../../controllers/usuario.controller';
import { useTrabajadorController } from '../../../controllers/trabajador.controller';

interface Habilidad {
  id_habilidad: number;
  nombre: string;
}

interface UserInfoJSON {
  fullName: string;
  email: string;
}

interface WorkerInfoJSON {
  ubicacion: string;
  tarifa_hora: number;
  acercaDe: string;
  experienciaLaboral: string;
  especialidad_carrera: string;
  is_verified: boolean;
  disponibilidad: string;
  habilidades: number[];
  categorias: number[];
}

interface FormErrors {
  fullName?: string;
  email?: string;
  ubicacion?: string;
  tarifa_hora?: string;
  acercaDe?: string;
  experiencia_laboral?: string;
  especialidad_carrera?: string;
  habilidades?: string;
  categorias?: string;
}

export const EditWorkerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const userController = useUsuarioController();
  const trabajadorController = useTrabajadorController();

  // Estados Formulario Base
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');
  const [tarifaHora, setTarifaHora] = useState<string>('');
  const [acercaDe, setAcercaDe] = useState<string>('');
  const [experienciaLaboral, setExperienciaLaboral] = useState<string>('');
  const [especialidadCarrera, setEspecialidadCarrera] = useState<number | ''>('');
  const [disponibilidad, setDisponibilidad] = useState<string>("Available");

  // Estados de Habilidades y Categorías Seleccionadas
  const [habilidadesList, setHabilidadesList] = useState<Habilidad[]>([]);
  const [selectedHabilidades, setSelectedHabilidades] = useState<Habilidad[]>([]);
  const [habilidadSearch, setHabilidadSearch] = useState<string>('');
  const [showHabilidadSuggestions, setShowHabilidadSuggestions] = useState<boolean>(false);

  const [selectedCategorias, setSelectedCategorias] = useState<Array<{ id: number; text: string }>>([]);
  const [categoriaSearch, setCategoriaSearch] = useState<string>('');
  const [showCategoriaSuggestions, setShowCategoriaSuggestions] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const habilidadController = useHabilidadController();

  // Carga inicial de datos mockeados / Endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {

        const fetchedHabilidades = await habilidadController.getAll();
        if (user) {
          const respUsuarData = await userController.getById(user?.id)
          const respTrbajadorData = await trabajadorController.getByIdUsuario(user?.id)
          //console.log(respUsuarData)
          console.log(respTrbajadorData)

          setFullName(respUsuarData.fullName);
          setEmail(respUsuarData.email);

          // Simulando datos existentes del Worker (Back-end mock)
          setUbicacion(respTrbajadorData.ubicacion ?? '');
          setTarifaHora(String(respTrbajadorData.tarifa_hora ?? 35.0));
          setAcercaDe(respTrbajadorData.acercaDe ?? '');
          setExperienciaLaboral(respTrbajadorData.experienciaLaboral ?? '');
          const especialidad = Object.values(CategoriaVacante).find(
            (categoria) => categoria.text === (respTrbajadorData.especialidad_carrera ?? 'Other')
          );
          setEspecialidadCarrera(especialidad?.value ?? "");

          setDisponibilidad(respTrbajadorData.disponibilidad);

          // Carga inicial de fichas seleccionadas previamente
          setSelectedHabilidades(respTrbajadorData.habilidades);

          setSelectedCategorias(
            respTrbajadorData.categorias.map((categoria: any) => ({
              id: categoria.id_especialidad,
              text: categoria.nombre,
            }))
          );
        }
        //console.log(fetchedHabilidades);
        setIsLoading(true);
        setHabilidadesList(fetchedHabilidades);


      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Manejo de Habilidades ---
  const filteredHabilidades = habilidadesList.filter(
    (hab) =>
      hab.nombre.toLowerCase().includes(habilidadSearch.toLowerCase()) &&
      !selectedHabilidades.some((sel) => sel.id_habilidad === hab.id_habilidad)
  );

  const handleAddHabilidad = (habilidad: Habilidad) => {
    setSelectedHabilidades((prev) => [...prev, habilidad]);
    setHabilidadSearch('');
    setShowHabilidadSuggestions(false);
    if (errors.habilidades) setErrors((prev) => ({ ...prev, habilidades: undefined }));
  };

  const handleRemoveHabilidad = (id: number) => {
    setSelectedHabilidades((prev) => prev.filter((item) => item.id_habilidad !== id));
  };

  // --- Manejo de Categorías Multiple ---
  const allCategories = Object.values(CategoriaVacante);

  const filteredCategorias = allCategories.filter(
    (cat) =>
      cat.text.toLowerCase().includes(categoriaSearch.toLowerCase()) &&
      !selectedCategorias.some((sel) => sel.id === cat.value)
  );

  const handleAddCategoria = (cat: { value: number; text: string }) => {
    setSelectedCategorias((prev) => [...prev, { id: cat.value, text: cat.text }]);
    setCategoriaSearch('');
    setShowCategoriaSuggestions(false);
    if (errors.categorias) setErrors((prev) => ({ ...prev, categorias: undefined }));
  };

  const handleRemoveCategoria = (id: number) => {
    setSelectedCategorias((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Validación ---
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!ubicacion.trim()) newErrors.ubicacion = 'Location is required.';

    const tarifaNum = parseFloat(tarifaHora);
    if (!tarifaHora || isNaN(tarifaNum) || tarifaNum <= 0) {
      newErrors.tarifa_hora = 'Hourly rate must be a number greater than 0.';
    }

    if (!acercaDe.trim()) newErrors.acercaDe = 'About section is required.';
    if (!experienciaLaboral.trim()) newErrors.experiencia_laboral = 'Work experience is required.';
    if (especialidadCarrera === '') newErrors.especialidad_carrera = 'Please select a main specialty.';
    if (selectedHabilidades.length === 0) newErrors.habilidades = 'Select at least one skill.';
    if (selectedCategorias.length === 0) newErrors.categorias = 'Select at least one category.';

    return newErrors;
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cálculo dinámico de isVerified
    const isVerified =
      Boolean(fullName.trim()) &&
      Boolean(email.trim()) &&
      Boolean(ubicacion.trim()) &&
      parseFloat(tarifaHora) > 0 &&
      Boolean(acercaDe.trim()) &&
      Boolean(experienciaLaboral.trim()) &&
      especialidadCarrera !== '' &&
      selectedHabilidades.length > 0 &&
      selectedCategorias.length > 0;

    // JSON 1: Información del Usuario
    const json1UserInfo: UserInfoJSON = {
      fullName: fullName.trim(),
      email: email.trim(),
    };

    // JSON 2: Información del Trabajador
    const json2WorkerInfo: WorkerInfoJSON = {
      ubicacion: ubicacion.trim(),
      tarifa_hora: parseFloat(tarifaHora),
      acercaDe: acercaDe.trim(),
      experienciaLaboral: experienciaLaboral.trim(),
      especialidad_carrera: Object.values(CategoriaVacante).find(
        (categoria) => categoria.value === Number(especialidadCarrera)
      )?.text ?? "",
      is_verified: isVerified,
      disponibilidad,
      habilidades: selectedHabilidades.map((h) => h.id_habilidad),
      categorias: selectedCategorias.map((c) => c.id),
    };

    console.log('📌 JSON 1 (User Info):', JSON.stringify(json1UserInfo, null, 2));

    console.log('📌 JSON 2 (Worker Info):', JSON.stringify(json2WorkerInfo, null, 2));

    try {
      if (user) {
        await userController.update(user?.id, json1UserInfo)
        await trabajadorController.updateByIdUsuario(user.id, json2WorkerInfo)
      }
    } catch {
      console.log("ERROR")
    } finally {
      navigate('/worker/');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.containerWrapper}>
        <div className="text-center mt-5">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account and preferences</p>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>

            {/* SECCIÓN 1: USER INFO */}
            <h2 className={styles.sectionTitle}>Account information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.fieldLabel}>Full name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className={`${styles.inputField} ${errors.fullName ? styles.inputError : ''}`}
              />
              {errors.fullName && <div className={styles.errorMessage}>{errors.fullName}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.fieldLabel}>Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </div>

            {/* SECCIÓN 2: WORKER INFO */}
            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Worker profile</h2>

            <div className={styles.formGroup}>
              <label htmlFor="ubicacion" className={styles.fieldLabel}>Location</label>
              <input
                type="text"
                id="ubicacion"
                value={ubicacion}
                onChange={(e) => {
                  setUbicacion(e.target.value);
                  if (errors.ubicacion) setErrors((prev) => ({ ...prev, ubicacion: undefined }));
                }}
                className={`${styles.inputField} ${errors.ubicacion ? styles.inputError : ''}`}
              />
              {errors.ubicacion && <div className={styles.errorMessage}>{errors.ubicacion}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tarifaHora" className={styles.fieldLabel}>Hourly Rate ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                id="tarifaHora"
                value={tarifaHora}
                onChange={(e) => {
                  setTarifaHora(e.target.value);
                  if (errors.tarifa_hora) setErrors((prev) => ({ ...prev, tarifa_hora: undefined }));
                }}
                className={`${styles.inputField} ${errors.tarifa_hora ? styles.inputError : ''}`}
              />
              {errors.tarifa_hora && <div className={styles.errorMessage}>{errors.tarifa_hora}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="especialidadCarrera" className={styles.fieldLabel}>Main Specialty</label>
              <select
                id="especialidadCarrera"
                value={especialidadCarrera}
                onChange={(e) => {
                  setEspecialidadCarrera(Number(e.target.value));
                  if (errors.especialidad_carrera) setErrors((prev) => ({ ...prev, especialidad_carrera: undefined }));
                }}
                className={`${styles.selectField} ${errors.especialidad_carrera ? styles.inputError : ''}`}
              >
                <option value="">Select a specialty...</option>
                {Object.values(CategoriaVacante).map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.text}
                  </option>
                ))}
              </select>
              {errors.especialidad_carrera && <div className={styles.errorMessage}>{errors.especialidad_carrera}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="disponibilidad" className={styles.fieldLabel}>Availability</label>
              <select
                id="disponibilidad"
                value={disponibilidad}
                onChange={(e) => setDisponibilidad(e.target.value)}
                className={styles.selectField}
              >
                <option value="Avaliable">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="acercaDe" className={styles.fieldLabel}>About me</label>
              <textarea
                id="acercaDe"
                rows={3}
                value={acercaDe}
                onChange={(e) => {
                  setAcercaDe(e.target.value);
                  if (errors.acercaDe) setErrors((prev) => ({ ...prev, acercaDe: undefined }));
                }}
                className={`${styles.textareaField} ${errors.acercaDe ? styles.inputError : ''}`}
              />
              {errors.acercaDe && <div className={styles.errorMessage}>{errors.acercaDe}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="experienciaLaboral" className={styles.fieldLabel}>Work Experience</label>
              <textarea
                id="experienciaLaboral"
                rows={3}
                value={experienciaLaboral}
                onChange={(e) => {
                  setExperienciaLaboral(e.target.value);
                  if (errors.experiencia_laboral) setErrors((prev) => ({ ...prev, experiencia_laboral: undefined }));
                }}
                className={`${styles.textareaField} ${errors.experiencia_laboral ? styles.inputError : ''}`}
              />
              {errors.experiencia_laboral && <div className={styles.errorMessage}>{errors.experiencia_laboral}</div>}
            </div>

            {/* AUTOCOMPLETE / CHIPS: HABILIDADES */}
            <div className={styles.formGroup} style={{ position: 'relative' }}>
              <label htmlFor="habilidadSearch" className={styles.fieldLabel}>Skills</label>
              <input
                type="text"
                id="habilidadSearch"
                placeholder="Search and add skills..."
                value={habilidadSearch}
                onFocus={() => setShowHabilidadSuggestions(true)}
                onChange={(e) => {
                  setHabilidadSearch(e.target.value);
                  setShowHabilidadSuggestions(true);
                }}
                className={`${styles.inputField} ${errors.habilidades ? styles.inputError : ''}`}
              />
              {showHabilidadSuggestions && filteredHabilidades.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredHabilidades.map((hab) => (
                    <li
                      key={hab.id_habilidad}
                      onClick={() => handleAddHabilidad(hab)}
                      className={styles.suggestionItem}
                    >
                      {hab.nombre}
                    </li>
                  ))}
                </ul>
              )}
              {errors.habilidades && <div className={styles.errorMessage}>{errors.habilidades}</div>}

              <div className={styles.chipContainer}>
                {selectedHabilidades.map((hab) => (
                  <span key={hab.id_habilidad} className={styles.chip}>
                    {hab.nombre}
                    <button
                      type="button"
                      onClick={() => handleRemoveHabilidad(hab.id_habilidad)}
                      className={styles.chipRemoveBtn}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* AUTOCOMPLETE / CHIPS: CATEGORÍAS */}
            <div className={styles.formGroup} style={{ position: 'relative' }}>
              <label htmlFor="categoriaSearch" className={styles.fieldLabel}>Categories</label>
              <input
                type="text"
                id="categoriaSearch"
                placeholder="Search and add categories..."
                value={categoriaSearch}
                onFocus={() => setShowCategoriaSuggestions(true)}
                onChange={(e) => {
                  setCategoriaSearch(e.target.value);
                  setShowCategoriaSuggestions(true);
                }}
                className={`${styles.inputField} ${errors.categorias ? styles.inputError : ''}`}
              />
              {showCategoriaSuggestions && filteredCategorias.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredCategorias.map((cat) => (
                    <li
                      key={cat.value}
                      onClick={() => handleAddCategoria(cat)}
                      className={styles.suggestionItem}
                    >
                      {cat.text}
                    </li>
                  ))}
                </ul>
              )}
              {errors.categorias && <div className={styles.errorMessage}>{errors.categorias}</div>}

              <div className={styles.chipContainer}>
                {selectedCategorias.map((cat) => (
                  <span key={cat.id} className={styles.chip}>
                    {cat.text}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategoria(cat.id)}
                      className={styles.chipRemoveBtn}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.actionsRow}>
              <button type="submit" className={styles.btnSubmit}>
                Save changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};