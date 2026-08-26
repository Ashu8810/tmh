'use client';

import { useState } from 'react';

type UserData = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
};

export default function AdminUsersClient({ 
  initialUsers,
  currentUserId 
}: { 
  initialUsers: UserData[],
  currentUserId: string 
}) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [generatedResetLink, setGeneratedResetLink] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send invite');
      }

      setMessage(`Invite sent to ${email} as ${role}`);
      setEmail('');
      setRole('MEMBER');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!window.confirm("Are you sure you want to revoke this user's access? This will immediately destroy their active sessions.")) return;
    
    setRevokingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}/revoke`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, isActive: false } : u));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to revoke user');
      }
    } catch (e) {
      console.error(e);
      alert('Error revoking user');
    } finally {
      setRevokingId(null);
    }
  };

  const handleResetPassword = async (id: string) => {
    setResettingId(id);
    setGeneratedResetLink(null);
    try {
      const res = await fetch(`/api/admin/users/${id}/reset`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedResetLink(data.resetUrl);
      } else {
        alert(data.error || 'Failed to generate reset link');
      }
    } catch (e) {
      console.error(e);
      alert('Error generating reset link');
    } finally {
      setResettingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-8 pt-24 font-sans text-white selection:bg-[#D71920] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase italic">
              <span className="w-8 h-[2px] bg-[#D71920]" />
              <p>System Administration</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic transform -skew-x-6">
              MANAGE USERS
            </h1>
            <p className="mt-4 text-zinc-400 font-sans text-sm md:text-base max-w-xl">
              Admin controls for user access, role assignments, and security enforcement.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/reports"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-bold text-sm tracking-wider uppercase italic transform -skew-x-6 transition-all hover:scale-105"
            >
              <div className="transform skew-x-6">Back to Reports</div>
            </a>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-6 py-3 bg-[#D71920] hover:bg-red-700 text-white font-heading font-bold text-sm tracking-wider uppercase italic transform -skew-x-6 transition-all hover:scale-105"
              >
                <div className="transform skew-x-6">Log out</div>
              </button>
            </form>
          </div>
        </header>

        {/* Invite Member */}
        <main className="bg-[#0a0a0a] p-8 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D71920]" />
          <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-white mb-6 italic transform -skew-x-6">
            Invite New Member
          </h2>
          
          {message && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-sm text-sm font-mono">
              &gt; {message}
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-[#D71920] p-4 rounded-sm text-sm font-mono">
              &gt; ERROR: {error}
            </div>
          )}

          <form onSubmit={handleInvite}>
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="MEMBER@EXAMPLE.COM"
                  className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D71920] font-mono text-sm uppercase transition-colors rounded-sm"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D71920] font-mono text-sm uppercase transition-colors appearance-none rounded-sm"
                >
                  <option value="MEMBER">Role: Member</option>
                  <option value="CLUB_HEAD">Role: Club Head</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#D71920] hover:bg-red-700 text-white font-heading font-bold text-sm tracking-wider uppercase italic transform -skew-x-6 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <div className="transform skew-x-6">{loading ? 'TRANSMITTING...' : 'SEND INVITE'}</div>
              </button>
            </div>
          </form>
        </main>

        {generatedResetLink && (
          <main className="bg-emerald-950/30 p-8 rounded-sm border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h2 className="text-xl font-heading font-black uppercase tracking-tight text-emerald-400 mb-2 italic transform -skew-x-6">
              SECURITY KEY GENERATED
            </h2>
            <p className="text-sm text-emerald-500/70 mb-6 font-mono">
              Share this single-use link securely. Expires in 24 hours.
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <input 
                type="text" 
                readOnly 
                value={generatedResetLink} 
                className="flex-1 bg-black border border-emerald-500/30 px-4 py-3 text-emerald-400 font-mono text-xs rounded-sm focus:outline-none"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedResetLink);
                  alert('Copied to clipboard!');
                }}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm tracking-wider uppercase italic transform -skew-x-6 transition-all hover:scale-105"
              >
                <div className="transform skew-x-6">COPY LINK</div>
              </button>
            </div>
          </main>
        )}

        {/* Active Users Table */}
        <main className="bg-[#0a0a0a] p-8 rounded-sm border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-white mb-8 italic transform -skew-x-6">
            Active Personnel
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400 font-mono">
              <thead className="text-xs uppercase bg-[#121212] text-zinc-300 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">Identification</th>
                  <th scope="col" className="px-6 py-4">Clearance</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Directives</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-6 text-zinc-300">
                      {u.email} {u.id === currentUserId && <span className="text-[#D71920] ml-2 font-bold">(YOU)</span>}
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase border ${
                        u.role === 'ADMIN' ? 'bg-[#D71920]/10 text-[#D71920] border-[#D71920]/20' : 
                        u.role === 'CLUB_HEAD' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {u.isActive ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-emerald-500 font-bold text-xs uppercase tracking-wider">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-red-500 font-bold text-xs uppercase tracking-wider">Revoked</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      {u.id !== currentUserId && u.isActive && (
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <button
                            onClick={() => handleResetPassword(u.id)}
                            disabled={resettingId === u.id}
                            className="text-zinc-400 hover:text-emerald-400 text-xs font-bold uppercase tracking-widest disabled:opacity-50 transition-colors flex items-center gap-2"
                          >
                            <span className="text-lg">⚡</span>
                            {resettingId === u.id ? 'GENERATING...' : 'RESET PASS'}
                          </button>
                          <button
                            onClick={() => handleRevoke(u.id)}
                            disabled={revokingId === u.id}
                            className="text-zinc-400 hover:text-[#D71920] text-xs font-bold uppercase tracking-widest disabled:opacity-50 transition-colors flex items-center gap-2"
                          >
                            <span className="text-lg">☠</span>
                            {revokingId === u.id ? 'REVOKING...' : 'REVOKE'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
