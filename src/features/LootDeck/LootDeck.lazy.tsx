import React, { lazy, Suspense } from 'react';

const LazyLootDeck = lazy(() => import('./LootDeck'));

const LootDeck = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyLootDeck {...props} /> */}
  </Suspense>
);

export default LootDeck;
