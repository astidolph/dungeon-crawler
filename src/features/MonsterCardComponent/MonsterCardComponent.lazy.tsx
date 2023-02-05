import React, { lazy, Suspense } from 'react';

const LazyCardComponent = lazy(() => import('./MonsterCardComponent'));

const MonsterCardComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyCardComponent {...props} /> */}
  </Suspense>
);

export default MonsterCardComponent;
