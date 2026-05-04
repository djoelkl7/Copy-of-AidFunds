
import React, { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useUser } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const chartData = [
  { val: 400 }, { val: 300 }, { val: 600 }, { val: 800 }, { val: 500 }, { val: 900 }, { val: 1100 }
];

const AccountsPage: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const accounts = useMemo(() => [
    { 
      id: '1', 
      name: 'Primary Checking', 
      number: '**** 8821', 
      balance: user?.balance || '$4,200,000.00', 
      type: 'Checking', 
      status: 'Active',
      currency: 'USD',
      interest: '0.05%',
      opened: 'Jan 12, 2020',
      trend: chartData
    },
    { 
      id: '2', 
      name: 'Elite Savings', 
      number: '**** 0042', 
      balance: '$245,670.00', 
      type: 'Savings', 
      status: 'Active',
      currency: 'USD',
      interest: '4.25%',
      opened: 'Mar 05, 2021',
      trend: chartData.map(d => ({ val: d.val * 1.2 }))
    },
    { 
      id: '3', 
      name: 'Gold Reserve', 
      number: '**** 9901', 
      balance: '$1,200,000.00', 
      type: 'Investment', 
      status: 'Active',
      currency: 'XAU',
      interest: 'N/A',
      opened: 'Jun 20, 2018',
      trend: chartData.map(d => ({ val: d.val * 0.8 }))
    },
    { 
      id: '4', 
      name: 'Digital Asset Fund', 
      number: '**** 4432', 
      balance: '$86,400.00', 
      type: 'Crypto', 
      status: 'Active',
      currency: 'BTC/ETH',
      interest: '8.50%',
      opened: 'Sep 15, 2022',
      trend: chartData.map(d => ({ val: d.val * 1.5 }))
    },
  ], [user]);

  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         acc.number.includes(searchTerm);
    const matchesFilter = activeFilter === 'All' || acc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const accountTypes = ['All', 'Checking', 'Savings', 'Investment', 'Crypto'];

  const totalAssets = '$5,732,070.00';

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans bg-black min-h-screen">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Your Accounts</h1>
            <p className="text-gray-500 text-sm mt-2">Scale and monitor your global asset distribution.</p>
          </div>
          <div className="bg-primary-dark border border-gray-800 px-6 py-4 rounded-2xl shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Combined Total Assets</p>
            <p className="text-2xl font-black text-white">{totalAssets}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={100}>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by name or account number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 rounded-xl bg-primary-dark text-white placeholder-gray-600 focus:outline-none focus:border-primary-red transition-all text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {accountTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === type 
                    ? 'bg-primary-red text-white shadow-lg shadow-red-900/40' 
                    : 'bg-primary-dark border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-6">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account, idx) => (
            <AnimatedSection key={account.id} delay={idx * 50}>
              <div 
                className={`bg-primary-dark border transition-all duration-500 overflow-hidden rounded-3xl shadow-xl ${
                  expandedId === account.id ? 'border-primary-red/50 ring-1 ring-primary-red/20' : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                <div 
                  className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === account.id ? null : account.id)}
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-primary-red group">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{account.name}</h3>
                      <p className="text-xs text-gray-500 font-mono mt-1 tracking-widest">{account.number}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="hidden lg:block w-32 h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={account.trend}>
                          <Area type="monotone" dataKey="val" stroke="#E50914" fill="#E50914" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Available Balance</p>
                      <p className="text-2xl font-black text-white">{account.balance}</p>
                    </div>

                    <div className={`p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 transition-transform duration-300 ${expandedId === account.id ? 'rotate-180 text-primary-red' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === account.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="border-t border-gray-800"
                    >
                      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 bg-black/20">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Account Type</p>
                          <p className="text-sm font-bold text-white">{account.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Base Currency</p>
                          <p className="text-sm font-bold text-white">{account.currency}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Interest Rate</p>
                          <p className="text-sm font-bold text-green-500">{account.interest}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Relationship Since</p>
                          <p className="text-sm font-bold text-white">{account.opened}</p>
                        </div>

                        <div className="md:col-span-4 flex flex-wrap gap-4 pt-4">
                          <button className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-[10px] font-black uppercase tracking-widest text-white rounded-xl hover:bg-primary-red hover:border-primary-red transition-all">
                            Download Statement
                          </button>
                          <button className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-[10px] font-black uppercase tracking-widest text-white rounded-xl hover:bg-primary-red hover:border-primary-red transition-all">
                            Account Settings
                          </button>
                          <button className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-[10px] font-black uppercase tracking-widest text-white rounded-xl hover:bg-primary-red hover:border-primary-red transition-all">
                            Freeze Account
                          </button>
                          <button className="px-6 py-2.5 bg-primary-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 shadow-lg shadow-red-900/40 transition-all ml-auto">
                            Add Funds
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-900 rounded-3xl">
            <p className="text-gray-500 font-bold italic">No accounts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;
