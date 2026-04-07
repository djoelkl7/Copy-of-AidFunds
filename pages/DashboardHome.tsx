
import React from 'react';
import { useUser } from '../contexts/UserContext';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const stats = [
    { label: 'Total Balance', value: user.balance || '$0.00', color: 'text-white' },
    { label: 'Account Status', value: user.status || 'Active', color: user.isLocked ? 'text-red-500' : 'text-green-500' },
    { label: 'KYC Level', value: 'L3 - Ultra High', color: 'text-white' },
    { label: 'Interest Rate', value: '4.25% APY', color: 'text-green-500' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Welcome back, <span className="text-primary-red">{user.name}</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">Here's what's happening with your account today.</p>
          </div>
          <Link 
            to="/dashboard/profile"
            className="bg-primary-red text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 text-center"
          >
            Manage Profile
          </Link>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-2xl shadow-xl">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedSection delay={400}>
          <div className="bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-xl h-full">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-tight">Quick Actions</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary-red/50 transition-all group">
                <div className="w-12 h-12 bg-primary-red/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-red/20 transition-all">
                  <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Transfer</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary-red/50 transition-all group">
                <div className="w-12 h-12 bg-primary-red/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-red/20 transition-all">
                  <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Statement</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-xl h-full">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white tracking-tight">Market Overview</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Gold (XAU/USD)</span>
                <span className="text-sm font-bold text-green-500">+1.24%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">S&P 500</span>
                <span className="text-sm font-bold text-red-500">-0.45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Bitcoin (BTC)</span>
                <span className="text-sm font-bold text-green-500">+3.12%</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardHome;
