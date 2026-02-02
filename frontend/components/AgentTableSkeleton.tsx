import { Skeleton } from './ui/skeleton';

export default function AgentTableSkeleton() {
  return (
    <div className="bg-terminal-panel border border-terminal-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-terminal-border bg-terminal-bg">
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Agent Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                FDV
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Age (Days)
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Liquidity
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                24h Volume
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Holders
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Compliance
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-terminal-muted uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-terminal-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
