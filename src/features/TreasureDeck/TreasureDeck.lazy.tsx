import React, { lazy, Suspense } from 'react';

const LazyTreasureDeck = lazy(() => import('./TreasureDeck'));

const TreasureDeck = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyTreasureDeck {...props} /> */}
  </Suspense>
);

export default TreasureDeck;
