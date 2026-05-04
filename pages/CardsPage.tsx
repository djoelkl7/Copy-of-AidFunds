
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useUser } from '../contexts/UserContext';

const CardsPage: React.FC = () => {
  const { user } = useUser();
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Your Cards</h1>
          <p className="text-gray-500 text-sm mt-2">Manage your virtual and physical cards, view limits, and more.</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedSection delay={100}>
          <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl space-y-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Active Cards</h2>
            
            <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-400">{user?.cardType || 'Infinite Gold'}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-red-600/50"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-600/50 -ml-4"></div>
                  </div>
                </div>
                <p className="text-2xl font-mono tracking-[0.25em] text-white mb-8">{user?.cardNumber || '**** **** **** 0023'}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Card Holder</p>
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Expiry</p>
                    <p className="text-sm font-bold text-white">{user?.cardExpiry || '12/28'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Status</p>
                <p className={`text-sm font-bold ${isLocked ? 'text-red-500' : 'text-green-500'}`}>{isLocked ? 'Locked' : 'Active'}</p>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Daily Limit</p>
                <p className="text-sm font-bold text-white">$5,000.00 / $50,000.00</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Card Controls</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`w-full p-6 border rounded-2xl flex items-center justify-between group transition-all ${
                  isLocked ? 'bg-red-900/10 border-red-900/50' : 'bg-gray-900/50 border-gray-800 hover:border-primary-red/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isLocked ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400 group-hover:bg-primary-red/10 group-hover:text-primary-red'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Temporary Lock</p>
                    <p className="text-xs text-gray-500">Instantly disable all transactions</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-all ${isLocked ? 'bg-red-500' : 'bg-gray-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${isLocked ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </button>

              <button className="w-full p-6 bg-gray-900/50 border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-primary-red/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 text-gray-400 group-hover:bg-primary-red/10 group-hover:text-primary-red flex items-center justify-center transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Security Settings</p>
                    <p className="text-xs text-gray-500">Manage PIN and online limits</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-600 transition-all group-hover:text-primary-red group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>

              <button className="w-full p-6 bg-gray-900/50 border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-primary-red/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 text-gray-400 group-hover:bg-primary-red/10 group-hover:text-primary-red flex items-center justify-center transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Virtual Cards</p>
                    <p className="text-xs text-gray-500">Create cards for online shopping</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-600 transition-all group-hover:text-primary-red group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CardsPage;
