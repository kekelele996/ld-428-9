import { ArtworkStatus, ExhibitionStatus } from '../../types/enums';

const toneMap: Record<string, string> = {
  [ArtworkStatus.Published]: 'bg-moss text-rice',
  [ArtworkStatus.Draft]: 'bg-rice text-ink border border-ink/20',
  [ArtworkStatus.Sold]: 'bg-clay text-rice',
  [ArtworkStatus.Archived]: 'bg-ink/10 text-ink',
  [ExhibitionStatus.Active]: 'bg-lapis text-rice',
  [ExhibitionStatus.Planning]: 'bg-rice text-ink border border-ink/20',
  [ExhibitionStatus.Ended]: 'bg-ink text-rice',
  [ExhibitionStatus.Archived]: 'bg-ink/20 text-ink/70',
};

const labelMap: Record<string, string> = {
  [ArtworkStatus.Published]: '已发布',
  [ArtworkStatus.Draft]: '草稿',
  [ArtworkStatus.Sold]: '已售出',
  [ArtworkStatus.Archived]: '已归档',
  [ExhibitionStatus.Active]: '进行中',
  [ExhibitionStatus.Planning]: '策划中',
  [ExhibitionStatus.Ended]: '已结束',
  [ExhibitionStatus.Archived]: '已归档',
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneMap[status] ?? 'bg-ink/10 text-ink'}`}>{labelMap[status] ?? status}</span>;
}
