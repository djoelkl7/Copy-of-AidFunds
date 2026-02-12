import React, { useState, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { useForm } from '../hooks/useForm';
import AnimatedSection from '../components/AnimatedSection';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    initialValues: {
      name: user?.name || '',
    },
    validate: (values) => {
      const errors: { name?: string } = {};
      if (!values.name.trim()) {
        errors.name = 'Your name is required.';
      } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters.';
      }
      return errors;
    },
    onSubmit: (formValues) => {
      if (user?.isLocked) return; // Prevent editing if locked
      setTimeout(() => {
        updateUser({ name: formValues.name });
        setIsSubmitting(false);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }, 1000);
    },
  });

  const handleUploadClick = () => {
    if (user?.isLocked) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-light-bg dark:bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Section */}
            <div className="bg-primary-dark border border-gray-800 p-8 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-2 border-primary-red object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-primary-red flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary-red" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                  )}
                  {!user.isLocked && (
                    <button onClick={handleUploadClick} className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xs font-bold">Edit</span>
                    </button>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-gray-400">Personal Account • {user.username || 'User'}</p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${user.isLocked ? 'bg-red-500/10 text-red-500 border border-red-500/50 animate-pulse' : 'bg-green-500/10 text-green-500 border border-green-500/50'}`}>
                  {user.status || 'Active'}
                </span>
              </div>
            </div>

            {/* Alert Box if Locked */}
            {user.isLocked && (
              <div className="bg-red-950/30 border border-red-500/30 p-6 rounded-xl flex items-start gap-4">
                <div className="p-2 bg-red-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m11-3V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2zm-7 3a1 1 0 11-2 0 1 1 0 012 0zM11 7h2" /></svg>
                </div>
                <div>
                  <h3 className="text-red-400 font-bold text-lg">Account Security Alert</h3>
                  <p className="text-red-200/80">{user.lockedMessage}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Balance Card */}
              <div className="md:col-span-2 bg-primary-dark border border-gray-800 p-8 rounded-xl shadow-xl flex flex-col justify-between">
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest mb-1">Total Available Balance</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white">{user.balance || '$0.00'}</h2>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button disabled className="bg-primary-red/20 text-primary-red/50 cursor-not-allowed border border-primary-red/20 font-bold py-3 rounded-lg text-center">Transfer Funds</button>
                  <button disabled className="bg-white/5 text-white/50 cursor-not-allowed border border-white/10 font-bold py-3 rounded-lg text-center">Withdraw</button>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-primary-dark border border-gray-800 p-8 rounded-xl shadow-xl">
                <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">Account Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs">Email Address</p>
                    <p className="text-white text-sm break-all">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Last Transaction</p>
                    <p className="text-primary-red font-medium">{user.lastTransaction || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Currency</p>
                    <p className="text-white">USD - United States Dollar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Edit Section (Only if not locked, or display-only if locked) */}
            <div className="bg-primary-dark border border-gray-800 p-8 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
              <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-lg">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={user.isLocked}
                    className={`w-full bg-black/50 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-800'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition-all ${user.isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  />
                  {errors.name && touched.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>
                {!user.isLocked && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-red text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition transform hover:scale-105"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </form>
              {updateSuccess && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-center">
                  Profile updated successfully!
                </div>
              )}
            </div>

          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default ProfilePage;
