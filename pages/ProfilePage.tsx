
import React, { useState, useRef, ChangeEvent } from 'react';
import { useUser } from '../contexts/UserContext';
import { useForm } from '../hooks/useForm';
import AnimatedSection from '../components/AnimatedSection';

const LockIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CameraIcon: React.FC = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChipIcon: React.FC = () => (
  <svg className="w-10 h-8 text-yellow-500/80" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M7 5v14M12 5v14M17 5v14M2 10h20M2 14h20" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const DebitCard: React.FC<{ user: any }> = ({ user }) => (
  <div className="relative w-full aspect-[1.58/1] bg-gradient-to-br from-gray-900 via-primary-dark to-red-950 rounded-2xl p-6 shadow-2xl border border-white/10 overflow-hidden group">
    {/* Decorative Elements */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-red/20 rounded-full blur-3xl transition-all group-hover:bg-primary-red/30" />
    <div className="absolute top-4 right-6 flex flex-col items-end">
       <span className="text-[10px] font-black italic text-primary-red uppercase tracking-widest leading-none">AidFundsCapital</span>
       <span className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">Premier Banking</span>
    </div>
    
    <div className="h-full flex flex-col justify-between relative z-10">
      <div className="flex justify-between items-start">
        <ChipIcon />
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
           <svg className="w-8 h-8 text-white/50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
        </div>
      </div>
      
      <div>
        <p className="text-white text-xl md:text-2xl font-mono tracking-[0.2em] mb-4">
          {user.cardNumber || '**** **** **** ****'}
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Card Holder</p>
            <p className="text-sm font-bold uppercase tracking-wide text-white/90">{user.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Expires</p>
            <p className="text-sm font-bold text-white/90">{user.cardExpiry || '00/00'}</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Locked Overlay for UI consistency */}
    {user.isLocked && (
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-red-600 text-white p-2 rounded-lg shadow-xl scale-90 group-hover:scale-100 transition-transform">
           <LockIcon />
        </div>
      </div>
    )}
  </div>
);

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editName, setEditName] = useState(user?.name || '');
  const [isSavingName, setIsSavingName] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (isUpdatingAvatar) return;
    avatarInputRef.current?.click();
  };

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    setIsSavingName(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    updateUser({ name: editName });
    setIsSavingName(false);
  };

  const isNameChanged = editName !== user?.name;

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setUploadError('Image size must be less than 2MB.');
        return;
      }

      setUploadError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.onerror = () => {
        setUploadError('Failed to read file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAvatar = async () => {
    if (!previewAvatar) return;
    
    setIsUpdatingAvatar(true);
    setUploadProgress(0);

    // Simulate upload progress
    const duration = 1500;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      setUploadProgress(Math.min(Math.round(i * increment), 100));
    }

    updateUser({ avatar: previewAvatar });
    setIsUpdatingAvatar(false);
    setPreviewAvatar(null);
    setUploadProgress(0);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancelAvatar = () => {
    setPreviewAvatar(null);
    setUploadProgress(0);
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  const transactions = [
    { date: '2024-03-15', description: 'Gold Bullion Purchase Credit', amount: '+$4,200,000.00', status: 'Completed', type: 'Credit' },
    { date: '2024-03-14', description: 'Account Verification Hold', amount: '$0.00', status: 'Pending', type: 'System' },
    { date: '2024-03-10', description: 'Initial Wire Deposit', amount: '+$50,000.00', status: 'Completed', type: 'Credit' },
  ];

  if (!user) return null;

  return (
    <div className="p-6 md:p-10 font-sans selection:bg-primary-red selection:text-white">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Account Summary */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Balance Card */}
              <div className="bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative">
                {user.isLocked && (
                  <div className="absolute top-0 right-0 p-4">
                     <span className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-tighter rounded animate-pulse shadow-lg shadow-red-900/50">
                        <LockIcon /> Restricted
                     </span>
                  </div>
                )}
                <div className="p-8 md:p-12">
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Total Available Liquidity</p>
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                      {user.balance || '$0.00'}
                    </h2>
                    <span className="text-gray-600 font-medium text-xl">USD</span>
                  </div>
                  
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Account Type</p>
                      <p className="text-sm font-bold">{user.cardType || 'Premium Private'}</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Currency</p>
                      <p className="text-sm font-bold">USD - $</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Branch</p>
                      <p className="text-sm font-bold">Global HQ</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Interest Rate</p>
                      <p className="text-sm font-bold text-green-500">4.25% APY</p>
                    </div>
                  </div>
                </div>

                {/* Account Alerts */}
                {user.isLocked && (
                  <div className="bg-red-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <p className="text-white text-sm font-bold">Your account is currently under administrative hold. Full functionality restricted.</p>
                    </div>
                    <button className="hidden md:block bg-white text-red-600 text-xs font-black uppercase px-4 py-2 rounded-md hover:bg-gray-100 transition shadow-lg">Verify Identity</button>
                  </div>
                )}
              </div>

              {/* Transaction History */}
              <div className="bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white tracking-tight">Recent Transactions</h3>
                  <button className="text-[10px] font-black uppercase text-gray-500 hover:text-primary-red transition tracking-widest">View Full History</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-900/30">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Description</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {transactions.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-gray-900/20 transition-colors">
                          <td className="px-6 py-4 text-xs font-mono text-gray-400">{tx.date}</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{tx.description}</td>
                          <td className={`px-6 py-4 text-sm font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-white'}`}>{tx.amount}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Actions & Profile */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Virtual Debit Card */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Virtual Debit Card</h3>
                <DebitCard user={user} />
              </div>

              {/* Quick Actions Card */}
              <div className="bg-primary-dark border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-800 pb-4">Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button disabled className="flex items-center justify-between w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl group hover:border-primary-red/50 transition-all cursor-not-allowed opacity-50">
                    <span className="font-bold text-sm">Transfer Funds</span>
                    <LockIcon />
                  </button>
                  <button disabled className="flex items-center justify-between w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl group hover:border-primary-red/50 transition-all cursor-not-allowed opacity-50">
                    <span className="font-bold text-sm">Export Statement (PDF)</span>
                    <LockIcon />
                  </button>
                </div>
              </div>

              {/* Identity Section */}
              <div className="bg-primary-dark border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-red/5 blur-2xl rounded-full" />
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-800 pb-4">Verified Account Holder</h3>
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div 
                    onClick={handleAvatarClick}
                    className="relative p-1 rounded-2xl bg-gradient-to-tr from-primary-red via-red-900 to-gray-800 shadow-2xl cursor-pointer group"
                  >
                    {/* Hidden File Input */}
                    <input 
                      type="file" 
                      ref={avatarInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                    />
                    
                    {previewAvatar || user.avatar ? (
                      <div className="relative overflow-hidden rounded-xl">
                        <img src={previewAvatar || user.avatar} alt="Account Holder" className={`w-32 h-32 object-cover border-4 ${previewAvatar ? 'border-primary-red' : 'border-black'} shadow-inner transition-all`} />
                        {/* Edit Overlay */}
                        {!previewAvatar && !isUpdatingAvatar && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <CameraIcon />
                             <span className="text-[8px] font-black uppercase tracking-tighter text-white mt-1">Change Photo</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-xl bg-gray-900 border-4 border-black flex flex-col items-center justify-center overflow-hidden">
                        <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                        {!previewAvatar && !isUpdatingAvatar && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <CameraIcon />
                             <span className="text-[8px] font-black uppercase tracking-tighter text-white mt-1">Upload Photo</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Success/Loading Indicator */}
                    {isUpdatingAvatar && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-xl z-20">
                         <div className="w-6 h-6 border-2 border-primary-red border-t-transparent rounded-full animate-spin mb-2"></div>
                         <div className="w-20 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-red transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            />
                         </div>
                         <span className="text-[8px] font-black text-white mt-1">{uploadProgress}%</span>
                      </div>
                    )}

                    {showSuccess && !isUpdatingAvatar && (
                      <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center rounded-xl z-20 animate-in fade-in zoom-in duration-300">
                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      </div>
                    )}
                    
                    {!isUpdatingAvatar && !showSuccess && !previewAvatar && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-black shadow-lg z-20">
                         <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      </div>
                    )}
                  </div>

                  {previewAvatar && !isUpdatingAvatar && (
                    <div className="flex gap-2 w-full px-8">
                      <button 
                        onClick={handleConfirmAvatar}
                        className="flex-1 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-green-700 transition-all shadow-lg"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={handleCancelAvatar}
                        className="flex-1 bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-tighter animate-pulse">{uploadError}</p>
                  )}
                  <div className="text-center w-full px-4">
                    <div className="relative group/name">
                      <input 
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-transparent text-white font-black text-2xl tracking-tight leading-none text-center border-b-2 border-transparent focus:border-primary-red focus:outline-none transition-all py-1"
                        placeholder="Full Name"
                      />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </div>
                    </div>
                    <p className="text-primary-red text-[10px] font-black uppercase tracking-widest mt-2">Authenticated Member</p>
                    
                    {isNameChanged && (
                      <button 
                        onClick={handleSaveName}
                        disabled={isSavingName}
                        className="mt-4 w-full bg-primary-red text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
                      >
                        {isSavingName ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Passport / ID Document</p>
                    <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-800 group cursor-pointer shadow-lg">
                       {user.passportImage ? (
                         <img src={user.passportImage} alt="Passport" className="w-full h-32 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                       ) : (
                         <div className="w-full h-32 bg-gray-900 flex items-center justify-center">
                            <p className="text-xs text-gray-500">No Document Uploaded</p>
                         </div>
                       )}
                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black uppercase bg-white text-black px-2 py-1 rounded">View Full Size</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Email Status</p>
                      <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Confirmed
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">KYC Level</p>
                      <p className="text-xs text-white font-bold">L3 - Ultra High</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Status Message</p>
                    <p className="text-xs text-red-500 font-medium italic">"{user.lockedMessage || 'Pending review'}"</p>
                  </div>
                </div>
              </div>

              {/* Support Info */}
              <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-2xl text-center">
                <p className="text-gray-400 text-xs mb-4">Questions regarding your account hold?</p>
                <button className="text-primary-red font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">Contact Relationship Manager</button>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProfilePage;
