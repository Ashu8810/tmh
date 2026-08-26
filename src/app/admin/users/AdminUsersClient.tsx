'use client';

import { useState } from 'react';

export default function AdminUsersClient({ 
  initialUsers,
  currentUserId 
}: { 
  initialUsers: any[],
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin Controls</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/reports"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm font-medium transition-colors"
            >
              Back to Reports
            </a>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md text-sm font-medium transition-colors"
              >
                Log out
              </button>
            </form>
          </div>
        </header>

        <main className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Invite New Member</h2>
          
          {message && (
            <div className="mb-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-md text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleInvite}>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                />
              </div>
              <div className="w-48">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                >
                  <option value="MEMBER">Member</option>
                  <option value="CLUB_HEAD">Club Head</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 transition-colors"
              >
                {loading ? 'Sending...' : 'Send Invite'}
              </button>
            </div>
          </form>
        </main>

        {generatedResetLink && (
          <main className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Password Reset Link Generated</h2>
            <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-4">
              Securely share this link with the user. It expires in 24 hours.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={generatedResetLink} 
                className="flex-1 rounded-md border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-emerald-950 px-3 py-2 text-emerald-900 dark:text-emerald-100 font-mono text-sm"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedResetLink);
                  alert('Copied to clipboard!');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium text-sm transition-colors"
              >
                Copy
              </button>
            </div>
          </main>
        )}

        <main className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Active Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {u.email} {u.id === currentUserId && '(You)'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        u.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 
                        u.role === 'CLUB_HEAD' ? 'bg-purple-100 text-purple-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="text-green-500 font-bold">Active</span>
                      ) : (
                        <span className="text-red-500 font-bold">Revoked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex flex-col gap-2">
                      {u.id !== currentUserId && u.isActive && (
                        <>
                          <button
                            onClick={() => handleResetPassword(u.id)}
                            disabled={resettingId === u.id}
                            className="text-blue-600 hover:text-blue-900 font-bold disabled:opacity-50 text-left"
                          >
                            {resettingId === u.id ? 'Generating...' : 'Generate Reset Link'}
                          </button>
                          <button
                            onClick={() => handleRevoke(u.id)}
                            disabled={revokingId === u.id}
                            className="text-red-600 hover:text-red-900 font-bold disabled:opacity-50 text-left"
                          >
                            {revokingId === u.id ? 'Revoking...' : 'Revoke Access'}
                          </button>
                        </>
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
