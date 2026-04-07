
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Premium Member', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Standard Member', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: '3', name: 'Elena Rodriguez', email: 'elena@example.com', role: 'Elite Member', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Standard Member' });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser,
      status: 'Active'
    };
    setUsers([...users, user]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Standard Member' });
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <AnimatedSection>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">User Management</h1>
            <p className="text-gray-500 text-sm">Manage and create user profiles within the organization.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-red text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
          >
            Create User
          </button>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, idx) => (
          <AnimatedSection key={user.id} delay={idx * 100}>
            <div className="bg-primary-dark border border-gray-800 p-6 rounded-2xl shadow-xl hover:border-primary-red/30 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-800 group-hover:border-primary-red transition-all">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-xl font-bold text-gray-500">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 uppercase tracking-widest font-black">Role</span>
                  <span className="text-white font-bold">{user.role}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 uppercase tracking-widest font-black">Status</span>
                  <span className={`font-bold ${user.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>{user.status}</span>
                </div>
              </div>

              <button className="mt-6 w-full py-2 bg-gray-900 border border-gray-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary-red transition-all">
                View Profile
              </button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <AnimatedSection className="w-full max-w-md">
            <div className="bg-primary-dark border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Create New Profile</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-primary-red transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-primary-red transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Membership Role</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-primary-red transition-all appearance-none"
                  >
                    <option>Standard Member</option>
                    <option>Premium Member</option>
                    <option>Elite Member</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-primary-red text-white py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all"
                  >
                    Create
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
