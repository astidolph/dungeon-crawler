import React, { lazy, Suspense } from 'react';

const LazyDeck = lazy(() => import('./Deck'));

const Deck = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyDeck {...props} /> */}
  </Suspense>
);

export default Deck;
