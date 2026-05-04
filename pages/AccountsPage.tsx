
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useUser } from '../contexts/UserContext';

const AccountsPage: React.FC = () => {
  const { user } = useUser();

  const accounts = [
    { id: '1', name: 'Primary Checking', number: '**** 8821', balance: user?.balance || '$0.00', type: 'Checking', status: 'Active' },
    { id: '2', name: 'Elite Savings', number: '**** 0042', balance: '$245,670.00', type: 'Savings', status: 'Active' },
    { id: '3', name: 'Gold Reserve', number: '**** 9901', balance: '$1,200,000.00', type: 'Investment', status: 'Active' },
    { id: '4', name: 'Digital Asset Fund', number: '**** 4432', balance: '$86,400.00', type: 'Crypto', status: 'Active' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Your Accounts</h1>
          <p className="text-gray-500 text-sm mt-2">Manage and monitor all your linked accounts and assets.</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account, idx) => (
          <AnimatedSection key={account.id} delay={idx * 100}>
            <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl hover:border-primary-red/30 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary-red transition-colors">{account.name}</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1 tracking-widest">{account.number}</p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {account.status}
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Available Balance</p>
                <p className="text-3xl font-black text-white">{account.balance}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{account.type}</span>
                <button className="text-primary-red text-xs font-black uppercase tracking-widest hover:text-red-400 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
