import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminLogsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;

  if (!sessionId) {
    redirect('/login');
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date() || session.user.role !== 'ADMIN') {
    redirect('/reports');
  }

  // Fetch the latest 100 logs
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: {
        select: { email: true }
      }
    }
  });

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
              Immutable record of all secure document access, uploads, and deletions. Track IP addresses and user actions to ensure data integrity.
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
                  <th scope="col" className="px-6 py-4">Action</th>
                  <th scope="col" className="px-6 py-4">User</th>
                  <th scope="col" className="px-6 py-4">Report / Target</th>
                  <th scope="col" className="px-6 py-4 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-600 italic">
                      No security events logged yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest ${
                          log.action === 'UPLOAD' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          log.action === 'DOWNLOAD' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {log.user.email}
                      </td>
                      <td className="px-6 py-4 text-zinc-300 truncate max-w-[200px]" title={log.reportName || log.reportId || 'N/A'}>
                        {log.reportName || log.reportId || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-sans text-xs bg-black px-2 py-1 rounded border border-white/10">
                          {log.ipAddress || 'Unknown'}
                        </span>
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
