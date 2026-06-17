import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ArtistProfile } from '../pages/ArtistProfile';
import { ArtworkDetail } from '../pages/ArtworkDetail';
import { ExhibitionDetail } from '../pages/ExhibitionDetail';
import { ExhibitionHistory } from '../pages/ExhibitionHistory';
import { Gallery } from '../pages/Gallery';
import { Studio } from '../pages/Studio';
import { RequireRole } from './guards';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/gallery" replace /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/exhibitions/history', element: <ExhibitionHistory /> },
  { path: '/exhibition/:id', element: <ExhibitionDetail /> },
  { path: '/artwork/:id', element: <ArtworkDetail /> },
  { path: '/artist/:id', element: <ArtistProfile /> },
  {
    path: '/studio',
    element: (
      <RequireRole allow={['Admin', 'Curator', 'Artist']}>
        <Studio />
      </RequireRole>
    ),
  },
]);
