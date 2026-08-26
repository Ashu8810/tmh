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

        {/* Terminal Logs View */}
        <div className="bg-black border border-white/10 rounded-sm overflow-hidden shadow-2xl relative font-mono text-sm">
          {/* Terminal Header */}
          <div className="bg-[#121212] border-b border-white/10 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-zinc-500 text-xs uppercase tracking-widest">root@motorhead-secure:~</span>
            <div className="w-16" /> {/* spacer for balance */}
          </div>
          
          <div className="p-4 md:p-6 h-[70vh] overflow-y-auto font-mono custom-scrollbar relative">
            {unifiedLogs.length === 0 ? (
              <div className="text-zinc-500 italic">
                $ No security events found in the database.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-emerald-500 mb-4 text-xs md:text-sm">
                  System initialized...<br/>
                  Loading immutable audit logs...<br/>
                  {unifiedLogs.length} records retrieved.
                </div>
                {unifiedLogs.map(log => {
                  const dateStr = new Date(log.createdAt).toISOString().replace('T', ' ').substring(0, 19);
                  let colorClass = 'text-zinc-300';
                  let actionClass = 'text-zinc-400';
                  
                  if (log.action.includes('SUCCESS') || log.action === 'UPLOAD' || log.action === 'ACTIVE_SESSION') {
                    colorClass = 'text-emerald-400';
                    actionClass = 'text-emerald-500';
                  } else if (log.action === 'DOWNLOAD') {
                    colorClass = 'text-blue-400';
                    actionClass = 'text-blue-500';
                  } else if (log.action.includes('FAIL') || log.action.includes('DELETE') || log.action.includes('EXPIRE')) {
                    colorClass = 'text-red-400';
                    actionClass = 'text-red-500';
                  }

                  return (
                    <div key={`${log.type}-${log.id}`} className="hover:bg-white/5 p-2 rounded transition-colors break-all md:break-normal group">
                      <span className="text-zinc-600">[{dateStr}]</span>{' '}
                      <span className="text-purple-400 font-bold">[{log.type}]</span>{' '}
                      <span className={`${actionClass} font-bold tracking-widest`}>[{log.action}]</span>{' '}
                      <span className="text-yellow-400">{log.userEmail}</span>{' '}
                      <span className="text-zinc-500">| IP:</span> <span className="text-white">{log.ipAddress || 'Unknown'}</span>{' '}
                      <span className="text-zinc-500">| Target:</span> <span className="text-cyan-400">{log.target || 'N/A'}</span>{' '}
                      {log.userAgent && log.userAgent !== 'unknown' && (
                        <div className="pl-[210px] hidden md:block text-zinc-600 text-xs mt-1 truncate group-hover:text-zinc-400 transition-colors">
                          <span className="text-zinc-700">UA:</span> {log.userAgent}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="text-zinc-500 mt-4 flex items-center gap-2">
                  <span className="text-emerald-500">motorhead@sys</span><span className="text-white">~ $</span>
                  <span className="w-2 h-4 bg-white animate-pulse inline-block" />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
