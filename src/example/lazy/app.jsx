import { lazy,Suspense } from "preact/compat";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Test = lazy(async() => {
  await sleep(1000);
  // 加载组件
  return import("./child/page");
});


export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Test />
    </Suspense>
  );
}
