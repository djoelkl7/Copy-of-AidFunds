
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const LoansPage: React.FC = () => {
  const loans = [
    { title: 'Home Mortgage', total: '$850,000.00', remaining: '$420,500.00', interest: '3.25%', nextPayment: 'June 01, 2024', status: 'Active' },
    { title: 'Personal Credit Line', total: '$100,000.00', remaining: '$12,000.00', interest: '5.50%', nextPayment: 'May 15, 2024', status: 'Active' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      <AnimatedSection>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Loans & Credit</h1>
          <p className="text-gray-500 text-sm mt-2">Overview of your active loans, interest rates, and repayment schedules.</p>
        </div>
      </AnimatedSection>

      <div className="space-y-6">
        {loans.map((loan, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl hover:border-primary-red/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary-red transition-colors">{loan.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Status: <span className="text-green-500 font-bold uppercase tracking-widest">{loan.status}</span></p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Total Loan</p>
                      <p className="text-sm font-bold text-white">{loan.total}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Interest Rate</p>
                      <p className="text-sm font-bold text-green-500">{loan.interest}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Repayment Progress</p>
                    <p className="text-xs font-bold text-white">{((1 - parseFloat(loan.remaining.replace(/[$,]/g, '')) / parseFloat(loan.total.replace(/[$,]/g, ''))) * 100).toFixed(0)}% Paid</p>
                  </div>
                  <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                    <div 
                      className="h-full bg-primary-red shadow-lg shadow-red-900/40 transition-all duration-1000"
                      style={{ width: `${(1 - parseFloat(loan.remaining.replace(/[$,]/g, '')) / parseFloat(loan.total.replace(/[$,]/g, ''))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs font-bold text-white">{loan.remaining} Remaining</p>
                    <p className="text-xs font-bold text-gray-600">Original {loan.total}</p>
                  </div>
                </div>

                <div className="md:col-span-3 flex flex-col justify-between items-end">
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Next Payment</p>
                    <p className="text-lg font-black text-white">{loan.nextPayment}</p>
                  </div>
                  <button className="w-full md:w-auto px-8 py-3 bg-gray-900 border border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-red hover:border-primary-red transition-all">
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default LoansPage;
