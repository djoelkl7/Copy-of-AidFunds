
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const PaymentsPage: React.FC = () => {
  const bills = [
    { name: 'City Utilities', dueDate: 'May 10, 2024', amount: '$145.20', category: 'Utility', priority: 'High' },
    { name: 'Internet - G Fibre', dueDate: 'May 15, 2024', amount: '$79.99', category: 'Service', priority: 'Normal' },
    { name: 'Property Tax', dueDate: 'Jun 01, 2024', amount: '$2,100.00', category: 'Government', priority: 'High' },
    { name: 'Cloud Subscription', dueDate: 'May 20, 2024', amount: '$15.99', category: 'Software', priority: 'Low' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      <AnimatedSection>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Bill Payments</h1>
            <p className="text-gray-500 text-sm mt-2">View and manage your upcoming bills and recurring payments.</p>
          </div>
          <button className="bg-primary-red text-white px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-900/20">
            Add New Biller
          </button>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bills.map((bill, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-3xl shadow-xl hover:border-primary-red/30 transition-all group flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-xl bg-gray-800 ${bill.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded ${
                    bill.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {bill.priority} Priority
                  </span>
                </div>
                <h3 className="font-bold text-white group-hover:text-primary-red transition-colors">{bill.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{bill.category}</p>
                
                <div className="mt-6">
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Due Date</p>
                  <p className="text-sm font-bold text-white">{bill.dueDate}</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4">
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Amount Due</p>
                  <p className="text-2xl font-black text-white">{bill.amount}</p>
                </div>
                <button className="w-full py-3 bg-gray-900 border border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-red hover:border-primary-red transition-all">
                  Pay Now
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
