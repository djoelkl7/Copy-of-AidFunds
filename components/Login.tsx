import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.11 3.593-5.545 6.817-6.32M15.555 5.555a14.22 14.22 0 012.903 1.13M12 5c.48 0 .95.034 1.41.098M9.703 9.703a3 3 0 014.594-4.594M21 21l-4-4M3 3l4 4" />
    </svg>
);

const Login: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};

    if (!values.email.trim()) {
      errors.email = 'Username or Email is required.';
    }

    if (!values.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setIsSubmitting,
  } = useForm({
    initialValues,
    validate,
    onSubmit: (formValues) => {
      // Simulate API call for login
      setTimeout(() => {
        // Special check for DolmatBin credentials
        if (formValues.email === 'DolmatBin' && formValues.password === 'DolmatBin01') {
          login({
            email: 'dolmat@revolufund.online',
            name: 'Dolmat Bin',
            username: 'DolmatBin',
            balance: '$4,200,000.00',
            status: 'Temporarily Locked',
            lastTransaction: 'Gold Payment',
            lockedMessage: 'Account temporarily locked. Please visit nearest branch to verify high-value asset transfer.',
            isLocked: true,
            // Using a representative portrait of an older man to match user's provided image
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=400',
            passportImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=400&h=250&q=80',
            cardNumber: '4200 8821 9901 0023',
            cardExpiry: '12/28',
            cardType: 'Infinite Gold'
          });
        } else {
          login({ 
            email: formValues.email, 
            name: 'Sarah Johnson',
            isLocked: false,
            balance: '$1,250.00',
            status: 'Active',
            cardNumber: '4532 1102 3349 9081',
            cardExpiry: '05/26',
            cardType: 'Standard'
          });
        }
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/profile'); // Direct to profile to see the state
        }, 1000);
      }, 1500);
    },
  });

  return (
    <section className="min-h-screen bg-light-bg dark:bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
         <Link to="/" className="inline-block" aria-label="AidFunds homepage">
          <Logo />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-light-bg-secondary dark:bg-primary-gray py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {submitSuccess ? (
             <div className="text-center p-4 sm:p-6 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 dark:text-white">Login Successful!</h3>
              <p className="text-green-700 dark:text-gray-200 mt-2">Welcome back! Redirecting you now...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium sr-only">Username or Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username or Email"
                  className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.email && touched.email ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email && touched.email ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby="email-error"
                  required
                />
                {errors.email && touched.email && <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.password && touched.password ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 pr-10 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password && touched.password ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
                    aria-invalid={!!(errors.password && touched.password)}
                    aria-describedby="password-error"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-label="Toggle password visibility">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && touched.password && <p id="password-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-red hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;