import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from "axios";

type UserRole = 'work' | 'hire';

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('work');
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lógica de Validación
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Please enter your first and last name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitted(true);

  if (validate()) {
    try {
      const response = await axios.post("http://localhost:3000/usuario", {
        fullName,
        email,
        password,
        role,
      });
      console.log("✅ Usuario creado en backend:", response.data);
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Error del backend:", error.response.data);
      } else {
        console.error("❌ Error de conexión:", error.message);
      }
    }
  }
};
  return (
    <div className={`min-vh-100 d-flex flex-column align-items-center justify-content-center py-5 ${styles.pageBg}`}>
      
      {/* Brand Logo Header */}
      <div className="mb-4">
        <a href="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <span className={`d-inline-flex align-items-center justify-content-center fw-bold rounded-3 ${styles.logoIcon}`}>
            W
          </span>
          <span className="fw-extrabold text-dark fs-4">WorkMatch</span>
        </a>
      </div>

      {/* Register Card */}
      <div className={`card border-0 p-4 p-md-5 ${styles.registerCard}`}>
        <div className="card-body p-0">
          
          {/* Header text */}
          <h2 className="fw-extrabold text-dark mb-1 fs-3">Create your account</h2>
          <p className="text-secondary fs-6 mb-4">
            Already have one?{' '}
            <a href="/login" className={`fw-semibold text-decoration-none ${styles.loginLink}`}>
              Log in
            </a>
          </p>

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Full Name Field */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold text-dark fs-7 mb-1">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                className={`form-control ${styles.customInput} ${
                  isSubmitted && errors.fullName ? 'is-invalid' : ''
                }`}
                placeholder="Marcus Thompson"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (isSubmitted) validate();
                }}
              />
              {isSubmitted && errors.fullName && (
                <div className="invalid-feedback fs-7 mt-1">{errors.fullName}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-dark fs-7 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${styles.customInput} ${
                  isSubmitted && errors.email ? 'is-invalid' : ''
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isSubmitted) validate();
                }}
              />
              {isSubmitted && errors.email && (
                <div className="invalid-feedback fs-7 mt-1">{errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold text-dark fs-7 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${styles.customInput} ${
                  isSubmitted && errors.password ? 'is-invalid' : ''
                }`}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (isSubmitted) validate();
                }}
              />
              {isSubmitted && errors.password && (
                <div className="invalid-feedback fs-7 mt-1">{errors.password}</div>
              )}
            </div>

            {/* Label Selector */}
            <div className="mb-2">
              <span className={`fw-bold text-uppercase ${styles.sectionLabel}`}>
                I WANT TO
              </span>
            </div>

            {/* Role Selection Cards */}
            <div className="row g-3 mb-4">
              {/* Find Work Role */}
              <div className="col-6">
                <button
                  type="button"
                  className={`w-100 p-3 text-center border rounded-3 btn ${styles.roleCard} ${
                    role === 'work' ? styles.roleActive : ''
                  }`}
                  onClick={() => setRole('work')}
                >
                  <div className="fs-3 mb-1">🧑‍🌾</div>
                  <div className={`fw-bold ${styles.roleTitle}`}>Find work</div>
                  <div className={styles.roleSub}>I am looking for jobs</div>
                </button>
              </div>

              {/* Hire People Role */}
              <div className="col-6">
                <button
                  type="button"
                  className={`w-100 p-3 text-center border rounded-3 btn ${styles.roleCard} ${
                    role === 'hire' ? styles.roleActive : ''
                  }`}
                  onClick={() => setRole('hire')}
                >
                  <div className="fs-3 mb-1">🏢</div>
                  <div className={`fw-bold ${styles.roleTitle}`}>Hire people</div>
                  <div className={styles.roleSub}>I need to hire</div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={`btn w-100 py-3 fw-semibold ${styles.btnSubmit}`}>
              Create account — it's free
            </button>

            {/* Terms and Privacy Footer */}
            <p className="text-center text-muted fs-7 mt-3 mb-0">
              By signing up you agree to our{' '}
              <a href="#terms" className="text-muted text-decoration-underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-muted text-decoration-underline">
                Privacy Policy
              </a>
              .
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}