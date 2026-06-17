import { create } from 'zustand';

import { archiveExhibition, endExhibition, fetchExhibitions, publishExhibition } from '../api/exhibition';
import { ExhibitionStatus } from '../types/enums';
import type { Exhibition } from '../types/exhibition';

interface ExhibitionState {
  exhibitions: Exhibition[];
  loadExhibitions: (status?: ExhibitionStatus) => Promise<void>;
  publishExhibition: (id: string) => Promise<void>;
  endExhibition: (id: string) => Promise<void>;
  archiveExhibition: (id: string) => Promise<void>;
}

export const useExhibitionStore = create<ExhibitionState>((set, get) => ({
  exhibitions: [],
  loadExhibitions: async (status?: ExhibitionStatus) => {
    set({ exhibitions: await fetchExhibitions(status) });
  },
  publishExhibition: async (id: string) => {
    try {
      const updated = await publishExhibition(id);
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? updated : exhibition,
        ),
      });
    } catch {
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? { ...exhibition, status: ExhibitionStatus.Active } : exhibition,
        ),
      });
    }
  },
  endExhibition: async (id: string) => {
    try {
      const updated = await endExhibition(id);
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? updated : exhibition,
        ),
      });
    } catch {
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? { ...exhibition, status: ExhibitionStatus.Ended } : exhibition,
        ),
      });
    }
  },
  archiveExhibition: async (id: string) => {
    try {
      const updated = await archiveExhibition(id);
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? updated : exhibition,
        ),
      });
    } catch {
      set({
        exhibitions: get().exhibitions.map((exhibition) =>
          exhibition.id === id ? { ...exhibition, status: ExhibitionStatus.Archived } : exhibition,
        ),
      });
    }
  },
}));
