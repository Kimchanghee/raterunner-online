import { formatObservedAt, getReferenceRate, rateLabel, type RateSnapshot } from '@/lib/reference-rate';

export default function RateStatus({ snapshot, quote }: { snapshot: RateSnapshot; quote: string }) {
  const rate = getReferenceRate(snapshot, quote);
  const label = rateLabel(snapshot, quote);
  return <div className="rate-status" role="status">
    <span className={`status status-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</span>
    <span>Source: open.er-api.com · Updated: {formatObservedAt(snapshot.updatedAt)}</span>
    <span>{snapshot.state === 'stale' && rate !== null ? 'Older than 36 hours. Do not treat as current.' : 'Public reference, not an executable transfer quote.'}</span>
  </div>;
}
