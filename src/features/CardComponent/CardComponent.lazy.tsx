import React, { lazy, Suspense } from 'react';

const LazyCardComponent = lazy(() => import('./CardComponent'));

const CardComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyCardComponent {...props} /> */}
  </Suspense>
);

export default CardComponent;
