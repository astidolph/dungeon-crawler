import React, { lazy, Suspense } from 'react';

const LazyHand = lazy(() => import('./Hand'));

const Hand = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyHand {...props} /> */}
  </Suspense>
);

export default Hand;
