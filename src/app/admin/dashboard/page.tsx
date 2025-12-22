'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search, LogOut, Users, CreditCard, Calendar } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('participants');
    const [participants, setParticipants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/participants')
            .then(res => res.json())
            .then(data => {
                setParticipants(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // Stats Calculation
    const totalRegistrations = participants.length;
    const confirmed = participants.filter(p => p.status === 'confirmed').length;
    const pending = participants.filter(p => p.status === 'pending').length;
    const revenue = confirmed * 150;

    return (
        <div className="min-h-screen bg-luxury-black flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-black/40 border-r border-white/5 p-6 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-xl font-display text-luxury-gold">EURO ADMIN</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('participants')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'participants' ? 'bg-luxury-gold text-black' : 'text-luxury-silver hover:bg-white/5'}`}
                    >
                        <Users size={18} />
                        <span className="text-sm font-medium">Participants</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'payments' ? 'bg-luxury-gold text-black' : 'text-luxury-silver hover:bg-white/5'}`}
                    >
                        <CreditCard size={18} />
                        <span className="text-sm font-medium">Payments</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-luxury-gold text-black' : 'text-luxury-silver hover:bg-white/5'}`}
                    >
                        <Calendar size={18} />
                        <span className="text-sm font-medium">Events</span>
                    </button>
                </nav>

                <Link href="/admin">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-auto">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-display text-white">Dashboard Overview</h2>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-silver" size={16} />
                            <input
                                type="text"
                                placeholder="Search participants..."
                                className="bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-luxury-gold outline-none w-64"
                            />
                        </div>
                        <div className="bg-luxury-gold/10 text-luxury-gold px-4 py-1 rounded-full text-xs font-bold border border-luxury-gold/20">
                            EVENT LIVE
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                        <p className="text-luxury-silver text-xs uppercase tracking-wider mb-2">Total Registrations</p>
                        <p className="text-3xl font-display text-white">{loading ? '...' : totalRegistrations}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                        <p className="text-luxury-silver text-xs uppercase tracking-wider mb-2">Total Revenue (Est)</p>
                        <p className="text-3xl font-display text-luxury-gold">€{loading ? '...' : revenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                        <p className="text-luxury-silver text-xs uppercase tracking-wider mb-2">Pending</p>
                        <p className="text-3xl font-display text-white">{loading ? '...' : pending}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white">Recent Participants</h3>
                        <Button size="sm" variant="outline">Export CSV</Button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-xs uppercase text-luxury-silver">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-wider">Name</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Gender</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Bib #</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Payment</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-10 text-luxury-silver">Loading Data...</td></tr>
                            ) : participants.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-10 text-luxury-silver">No registrations yet.</td></tr>
                            ) : (
                                participants.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{p.full_name}</td>
                                        <td className="px-6 py-4 text-luxury-silver">{p.gender}</td>
                                        <td className="px-6 py-4 font-mono text-luxury-gold">{p.bib_number || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs ${p.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                {p.status === 'confirmed' ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-luxury-silver uppercase text-xs">{p.status}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-luxury-gold hover:underline text-xs">Edit</button>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
