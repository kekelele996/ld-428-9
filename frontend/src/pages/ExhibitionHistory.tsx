import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { EmptyState } from '../components/common/EmptyState';
import { ExhibitionBanner } from '../components/common/ExhibitionBanner';
import { useExhibitionStore } from '../stores/exhibitionStore';
import { ExhibitionStatus } from '../types/enums';

export function ExhibitionHistory() {
  const { exhibitions, loadExhibitions } = useExhibitionStore();

  useEffect(() => {
    void loadExhibitions();
  }, [loadExhibitions]);

  const endedExhibitions = exhibitions.filter(
    (exhibition) =>
      exhibition.status === ExhibitionStatus.Ended ||
      exhibition.status === ExhibitionStatus.Archived,
  );

  return (
    <main className="page-shell">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/gallery" className="font-display text-2xl">Atelier Index</Link>
        <nav className="flex gap-5 text-sm text-ink/70">
          <Link to="/gallery">画廊</Link>
          <Link to="/exhibitions/history" className="text-ink font-semibold">历史回顾</Link>
          <Link to="/studio">工作台</Link>
        </nav>
      </header>
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="pt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-clay">Exhibition archive</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] text-ink md:text-7xl">历史展览回顾</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">浏览过往的精彩展览，回顾那些曾经在这里呈现的艺术故事。</p>
        </div>
        <section className="mt-14">
          {endedExhibitions.length ? (
            <div className="grid gap-8 md:grid-cols-2">
              {endedExhibitions.map((exhibition) => (
                <ExhibitionBanner key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          ) : (
            <div className="py-20">
              <EmptyState
                title="暂无历史展览"
                description="已结束的展览会在这里展示，供观众回顾。"
              />
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
