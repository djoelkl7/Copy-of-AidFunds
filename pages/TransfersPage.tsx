
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const TransfersPage: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('External Wire');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer of $${amount} to ${recipient} via ${method} initiated.`);
    setRecipient('');
    setAmount('');
  };

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Transfers & Payments</h1>
          <p className="text-gray-500 text-sm mt-2">Move funds between your accounts or send to someone else.</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <AnimatedSection delay={100}>
            <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Initiate New Transfer</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Recipient Account / Email</label>
                    <input 
                      required 
                      type="text" 
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Enter recipient details"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary-red transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Amount (USD)</label>
                    <input 
                      required 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary-red transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Transfer Method</label>
                    <select 
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary-red transition-all appearance-none"
                    >
                      <option>Internal Transfer (Instant)</option>
                      <option>External Wire (1-3 Business Days)</option>
                      <option>Fast Cash Transfer</option>
                      <option>Crypto Settlement</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <button type="submit" className="w-full bg-primary-red text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-900/40">
                      Send Funds
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>

        <div className="lg:col-span-12">
          <AnimatedSection delay={200}>
            <div className="bg-primary-dark border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-800">
                      <th className="px-6 py-4">Recipient</th>
                      <th className="px-6 py-4">Method</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      { name: 'Sarah Miller', method: 'Internal', date: 'May 01, 2024', amount: '-$1,200.00', status: 'Completed' },
                      { name: 'Global Invest LLC', method: 'External Wire', date: 'Apr 28, 2024', amount: '-$50,000.00', status: 'Pending' },
                      { name: 'Self Transfer', method: 'Internal', date: 'Apr 25, 2024', amount: '+$5,000.00', status: 'Completed' },
                    ].map((tx, idx) => (
                      <tr key={idx} className="hover:bg-gray-900 transition-all group">
                        <td className="px-6 py-4 font-bold text-white group-hover:text-primary-red transition-colors">{tx.name}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">{tx.method}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">{tx.date}</td>
                        <td className={`px-6 py-4 text-sm font-black ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-white'}`}>{tx.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                            tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;
