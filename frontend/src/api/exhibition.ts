import { apiPaths } from '../constants/apiPaths';
import { exhibitions } from '../utils/mockData';
import { request } from '../utils/request';
import { ExhibitionStatus } from '../types/enums';
import type { Exhibition } from '../types/exhibition';

export async function fetchExhibitions(status?: ExhibitionStatus): Promise<Exhibition[]> {
  try {
    const url = status ? `${apiPaths.exhibitions}?status=${status}` : apiPaths.exhibitions;
    return await request<Exhibition[]>(url);
  } catch {
    if (status) {
      return exhibitions.filter((exhibition) => exhibition.status === status);
    }
    return exhibitions;
  }
}

export async function fetchExhibition(id: string): Promise<Exhibition | undefined> {
  const list = await fetchExhibitions();
  return list.find((exhibition) => exhibition.id === id);
}

export async function publishExhibition(id: string): Promise<Exhibition> {
  return await request<Exhibition>(`${apiPaths.exhibitions}/${id}/publish`, { method: 'PATCH' });
}

export async function endExhibition(id: string): Promise<Exhibition> {
  return await request<Exhibition>(`${apiPaths.exhibitions}/${id}/end`, { method: 'PATCH' });
}

export async function archiveExhibition(id: string): Promise<Exhibition> {
  return await request<Exhibition>(`${apiPaths.exhibitions}/${id}/archive`, { method: 'PATCH' });
}
