import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';

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

const SignUpForm: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.name.trim()) {
      errors.name = 'Your name is required.';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!values.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!values.password) {
      errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    } else if (!/(?=.*[a-z])/.test(values.password)) {
      errors.password = 'Password must contain a lowercase letter.';
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
      errors.password = 'Password must contain an uppercase letter.';
    } else if (!/(?=.*\d)/.test(values.password)) {
      errors.password = 'Password must contain a number.';
    } else if (!/(?=.*[\W_])/.test(values.password)) {
      errors.password = 'Password must contain a special character.';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
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
    resetForm,
  } = useForm({
    initialValues,
    validate,
    onSubmit: (formValues) => {
      // Simulate API call
      setTimeout(() => {
        console.log('Signed up with:', formValues);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        resetForm();
      }, 1500);
    },
  });

  if (submitSuccess) {
    return (
      <div className="text-center p-4 sm:p-6 bg-green-100 dark:bg-green-900/50 rounded-lg max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-green-800 dark:text-white">Welcome Aboard!</h3>
        <p className="text-green-700 dark:text-gray-200 mt-2">Thank you for signing up. Check your email for next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="sr-only">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your Name"
            className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.name && touched.name ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name && touched.name ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
            aria-invalid={!!(errors.name && touched.name)}
            aria-describedby="name-error"
          />
          {errors.name && touched.name && <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400 text-left" role="alert">{errors.name}</p>}
        </div>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email Address"
            className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.email && touched.email ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email && touched.email ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
            aria-invalid={!!(errors.email && touched.email)}
            aria-describedby="email-error"
          />
          {errors.email && touched.email && <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400 text-left" role="alert">{errors.email}</p>}
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.password && touched.password ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 pr-10 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password && touched.password ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
              aria-invalid={!!(errors.password && touched.password)}
              aria-describedby="password-error"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-label="Toggle password visibility">
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && touched.password && <p id="password-error" className="mt-2 text-sm text-red-600 dark:text-red-400 text-left" role="alert">{errors.password}</p>}
        </div>
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.confirmPassword && touched.confirmPassword ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 pr-10 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.confirmPassword && touched.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
              aria-invalid={!!(errors.confirmPassword && touched.confirmPassword)}
              aria-describedby="confirmPassword-error"
            />
             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-label="Toggle confirm password visibility">
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && <p id="confirmPassword-error" className="mt-2 text-sm text-red-600 dark:text-red-400 text-left" role="alert">{errors.confirmPassword}</p>}
        </div>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-red text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-red-500 transition duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            {isSubmitting ? 'Signing Up...' : 'Sign Up Now'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;