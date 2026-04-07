
import React from 'react';
import { useUser } from '../contexts/UserContext';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Jan', balance: 4000, spending: 2400 },
  { name: 'Feb', balance: 3000, spending: 1398 },
  { name: 'Mar', balance: 2000, spending: 9800 },
  { name: 'Apr', balance: 2780, spending: 3908 },
  { name: 'May', balance: 1890, spending: 4800 },
  { name: 'Jun', balance: 2390, spending: 3800 },
  { name: 'Jul', balance: 3490, spending: 4300 },
];

const transactions = [
  { id: 1, name: 'Apple Store', date: 'Oct 24, 2023', amount: '-$999.00', status: 'Completed', type: 'Shopping' },
  { id: 2, name: 'Salary Deposit', date: 'Oct 22, 2023', amount: '+$5,400.00', status: 'Completed', type: 'Income' },
  { id: 3, name: 'Netflix Subscription', date: 'Oct 20, 2023', amount: '-$15.99', status: 'Pending', type: 'Entertainment' },
  { id: 4, name: 'Starbucks Coffee', date: 'Oct 19, 2023', amount: '-$6.50', status: 'Completed', type: 'Food' },
  { id: 5, name: 'Rent Payment', date: 'Oct 15, 2023', amount: '-$1,200.00', status: 'Completed', type: 'Housing' },
];

const DashboardHome: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="p-4 md:p-8 space-y-8 bg-black min-h-full">
      {/* Account Summary */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-primary-red to-red-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
            </div>
            <div className="relative z-10">
              <p className="text-red-100 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Available Balance</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8">{user.balance || '$0.00'}</h2>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-red-200 text-[10px] font-bold uppercase tracking-widest mb-1">Account Number</p>
                  <p className="text-white font-mono text-sm tracking-widest">**** **** **** 8821</p>
                </div>
                <div>
                  <p className="text-red-200 text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
                  <p className="text-white font-bold text-sm">{user.status || 'Active'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-dark border border-gray-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Monthly Savings</p>
              <h3 className="text-3xl font-black text-green-500">+$12,450.00</h3>
              <p className="text-gray-600 text-xs mt-2 font-medium">12% increase from last month</p>
            </div>
            <div className="h-24 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(-5)}>
                  <Bar dataKey="balance" fill="#E50914" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Actions & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Section */}
          <AnimatedSection delay={200}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white tracking-tight">Financial Overview</h3>
                <select className="bg-gray-900 border border-gray-800 text-xs font-bold text-gray-400 px-3 py-1.5 rounded-lg focus:outline-none focus:border-primary-red">
                  <option>Last 7 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#4b5563" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #374151', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#E50914" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </AnimatedSection>

          {/* Transactions Section */}
          <AnimatedSection delay={400}>
            <div className="bg-primary-dark border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-tight">Recent Transactions</h3>
                <button className="text-primary-red text-xs font-black uppercase tracking-widest hover:text-red-400 transition-colors">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-800">
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-900/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-white group-hover:text-primary-red transition-colors">{tx.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-500 font-medium">{tx.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-500 font-medium">{tx.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-white'}`}>
                            {tx.amount}
                          </span>
                        </td>
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

        <div className="space-y-8">
          {/* Quick Actions */}
          <AnimatedSection delay={300}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white tracking-tight mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Send Money', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
                  { name: 'Pay Bills', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                  { name: 'Top Up', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                  { name: 'Request', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
                ].map((action) => (
                  <button key={action.name} className="flex flex-col items-center justify-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-primary-red/50 transition-all group">
                    <div className="w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-red/20 transition-all">
                      <svg className="w-5 h-5 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} /></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Card Section */}
          <AnimatedSection delay={500}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">My Cards</h3>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                   <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Infinite Gold</span>
                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
                  </div>
                  <p className="text-lg font-mono tracking-[0.2em] text-white mb-4">**** **** **** 0023</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Card Holder</p>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Expires</p>
                      <p className="text-xs font-bold text-white">12/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
