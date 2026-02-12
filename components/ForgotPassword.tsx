import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues = {
    email: '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};

    if (!values.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
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
      // Simulate API call for password reset
      setTimeout(() => {
        console.log('Password reset requested for:', formValues.email);
        setIsSubmitting(false);
        setSubmitSuccess(true);
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
          Reset your password
        </h2>
        {!submitSuccess && (
            <p className="mt-2 text-center text-sm text-light-text-secondary dark:text-gray-400">
                Enter your email and we'll send you a link to get back into your account.
            </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-light-bg-secondary dark:bg-primary-gray py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {submitSuccess ? (
             <div className="text-center p-4">
              <h3 className="text-xl font-bold text-light-text dark:text-white">Check your email</h3>
              <p className="text-light-text-secondary dark:text-gray-300 mt-2">If an account with that email address exists, we've sent you a link to reset your password.</p>
               <div className="mt-6">
                <Link to="/login" className="font-medium text-red-400 hover:text-red-500">
                    &larr; Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.email && touched.email ? 'border-primary-red' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email && touched.email ? 'focus:ring-red-500' : 'focus:ring-primary-red'} transition duration-300`}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby="email-error"
                  required
                />
                {errors.email && touched.email && <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.email}</p>}
              </div>

              <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;