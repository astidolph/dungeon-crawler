import React, { lazy, Suspense } from 'react';

const LazyMonsterDeck = lazy(() => import('./MonsterDeck'));

const MonsterDeck = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyMonsterDeck {...props} /> */}
  </Suspense>
);

export default MonsterDeck;
