
export default {
  title:'懒加载lazy的使用',
  description:`
    import { lazy,Suspense } from "preact/compat";
    const LazyComponent = lazy(() => import('./LazyComponent'));
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
    
  `

}