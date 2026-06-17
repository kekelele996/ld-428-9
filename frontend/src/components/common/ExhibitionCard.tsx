import { Link } from 'react-router-dom';

import { ExhibitionStatus } from '../../types/enums';
import type { Exhibition } from '../../types/exhibition';
import { StatusBadge } from './StatusBadge';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onPublish?: (id: string) => void;
  onEnd?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export function ExhibitionCard({ exhibition, onPublish, onEnd, onArchive }: ExhibitionCardProps) {
  const showActions = onPublish || onEnd || onArchive;

  return (
    <article className="overflow-hidden bg-rice transition duration-300 hover:-translate-y-1">
      <Link to={`/exhibition/${exhibition.id}`} className="block">
        <img className="h-48 w-full object-cover" src={exhibition.coverUrl} alt={exhibition.title} />
      </Link>
      <div className="border-x border-b border-ink/15 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/exhibition/${exhibition.id}`}>
              <h3 className="font-display text-xl text-ink hover:text-clay">{exhibition.title}</h3>
            </Link>
            <p className="mt-1 text-sm text-ink/60">{exhibition.type} · {exhibition.artworkIds.length} 件作品</p>
          </div>
          <StatusBadge status={exhibition.status} />
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-ink/70">{exhibition.description}</p>
        <p className="mt-4 text-xs uppercase tracking-wide text-ink/55">{exhibition.startDate} - {exhibition.endDate}</p>
        {showActions && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
            {onPublish && exhibition.status === ExhibitionStatus.Planning && (
              <button
                onClick={() => onPublish(exhibition.id)}
                className="bg-lapis px-4 py-2 text-xs font-semibold text-rice hover:opacity-90"
              >
                发布展览
              </button>
            )}
            {onEnd && exhibition.status === ExhibitionStatus.Active && (
              <button
                onClick={() => onEnd(exhibition.id)}
                className="bg-ink px-4 py-2 text-xs font-semibold text-rice hover:opacity-90"
              >
                结束展览
              </button>
            )}
            {onArchive && exhibition.status === ExhibitionStatus.Ended && (
              <button
                onClick={() => onArchive(exhibition.id)}
                className="border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
              >
                归档
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
