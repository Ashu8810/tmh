import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import Link from 'next/link';

type UnifiedLog = {
  id: string;
  type: 'FILE_ACTIVITY' | 'LOGIN' | 'SESSION';
  action: string;
  userEmail: string;
  ipAddress: string | null;
  userAgent: string | null;
  target: string | null;
  createdAt: Date;
};

export default async function AdminLogsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;

  if (!sessionId) {
    redirect('/login');
  }

  const currentSession = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!currentSession || currentSession.expiresAt < new Date() || currentSession.user.role !== 'ADMIN') {
    redirect('/reports');
  }

  // Fetch the latest 100 items from each category
  const [auditLogs, loginAttempts, sessions] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true } } }
    }),
    prisma.loginAttempt.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true } } }
    }),
    prisma.session.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true } } }
    })
  ]);

  // Unify and sort
  const unifiedLogs: UnifiedLog[] = [
    ...auditLogs.map(log => ({
      id: log.id,
      type: 'FILE_ACTIVITY' as const,
      action: log.action, // UPLOAD, DOWNLOAD, DELETE
      userEmail: log.user.email,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      target: log.reportName || log.reportId || 'N/A',
      createdAt: log.createdAt
    })),
    ...loginAttempts.map(log => ({
      id: log.id,
      type: 'LOGIN' as const,
      action: log.success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      userEmail: log.user?.email || 'Unknown User',
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      target: 'System Login',
      createdAt: log.createdAt
    })),
    ...sessions.map(sess => ({
      id: sess.id,
      type: 'SESSION' as const,
      action: sess.expiresAt > new Date() ? 'ACTIVE_SESSION' : 'EXPIRED_SESSION',
      userEmail: sess.user.email,
      ipAddress: 'N/A', // Sessions don't store IP in this schema
      userAgent: sess.userAgent,
      target: `Expires: ${new Date(sess.expiresAt).toLocaleDateString()}`,
      createdAt: sess.createdAt
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
   .slice(0, 150); // Take the most recent 150 unified events

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase italic">
              <span className="w-8 h-[2px] bg-[#D71920]" />
              <p>Security & Compliance</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic transform -skew-x-6">
              SYSTEM AUDIT LOGS
            </h1>
            <p className="mt-4 text-zinc-400 font-sans text-sm md:text-base max-w-xl">
              Immutable record of all secure document access, user logins, and active sessions.
            </p>
          </div>
          <Link 
            href="/admin/users"
            className="text-zinc-500 hover:text-white font-mono text-xs uppercase underline transition-colors"
          >
            &larr; Back to Users
          </Link>
        </header>

        {/* Logs Table */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400 font-mono">
              <thead className="text-xs uppercase bg-[#121212] text-zinc-300 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">Timestamp</th>
                  <th scope="col" className="px-6 py-4">Event Type</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                  <th scope="col" className="px-6 py-4">User</th>
                  <th scope="col" className="px-6 py-4">Details / Target</th>
                  <th scope="col" className="px-6 py-4 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {unifiedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-zinc-600 italic">
                      No security events logged yet.
                    </td>
                  </tr>
                ) : (
                  unifiedLogs.map(log => (
                    <tr key={`${log.type}-${log.id}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-500 text-[10px] tracking-widest uppercase">
                          {log.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest ${
                          log.action.includes('SUCCESS') || log.action === 'UPLOAD' || log.action === 'ACTIVE_SESSION' 
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          log.action === 'DOWNLOAD' 
                            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {log.action.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {log.userEmail}
                      </td>
                      <td className="px-6 py-4 text-zinc-300 truncate max-w-[200px]" title={log.target || 'N/A'}>
                        {log.target || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-sans text-xs bg-black px-2 py-1 rounded border border-white/10">
                            {log.ipAddress || 'Unknown'}
                          </span>
                          {log.userAgent && log.userAgent !== 'unknown' && (
                            <span 
                              className="text-[10px] text-zinc-500 max-w-[150px] truncate" 
                              title={log.userAgent}
                            >
                              {log.userAgent}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
