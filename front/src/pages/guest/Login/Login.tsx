import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNotification } from '../../../context/NotificationContext/NotificationContext';
import { useLoginController } from '../../../controllers/auth.controller';

type UserRole = 'worker' | 'employer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('worker');

  const { showNotification } = useNotification();
  const { login } = useLoginController();

const handleTest = () => {
  showNotification({
    type: 'success',
    title: 'Operación exitosa',
    description: 'La acción se realizó correctamente.',
  });
  showNotification({
    type: 'alert',
    title: 'Operación exitosa',
    description: 'La acción se realizó correctamente.',
  });
  showNotification({
    type: 'error',
    title: 'Operación exitosa',
    description: 'La acción se realizó correctamente.',
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await login({
    email,
    password,
    role,
  });
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

      {/* Login Card */}
      <div className={`card border-0 p-4 p-md-5 ${styles.loginCard}`}>
        <div className="card-body p-0">
          
          {/* Header text */}
          <h2 className="fw-extrabold text-dark mb-1 fs-3">Welcome back</h2>
          <p className="text-secondary fs-6 mb-4">
            No account?{' '}
            <a href="/register" className={`fw-semibold text-decoration-none ${styles.signupLink}`}>
              Sign up free
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-dark fs-7 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${styles.customInput}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <label htmlFor="password" className="form-label fw-semibold text-dark fs-7 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${styles.customInput}`}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-end mb-4">
              <a href="#forgot-password" className={`text-decoration-none fs-7 ${styles.forgotLink}`}>
                Forgot password?
              </a>
            </div>

            {/* Role Selection Cards */}
            <div className="row g-3 mb-4">
              {/* Find Work Role */}
              <div className="col-6">
                <button
                  type="button"
                  className={`w-100 p-3 text-center border rounded-3 btn ${styles.roleCard} ${
                    role === 'worker' ? styles.roleActive : ''
                  }`}
                  onClick={() => setRole('worker')}
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
                    role === 'employer' ? styles.roleActive : ''
                  }`}
                  onClick={() => setRole('employer')}
                >
                  <div className="fs-3 mb-1">🏢</div>
                  <div className={`fw-bold ${styles.roleTitle}`}>Hire people</div>
                  <div className={styles.roleSub}>I need to hire</div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button  type="submit" className={`btn w-100 py-3 fw-bold ${styles.btnSubmit}`}>
              Log in
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}