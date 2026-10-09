import { useSignal } from "@preact/signals";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import style from "./app.module.css";

let scrollCache = { x: 0, y: 0 };
export default function Page() {
  const arr = useSignal(new Array(100).fill(0));

  useEffect(() => {
    const { x = 0, y = 0 } = scrollCache || {};
    window.scrollTo(x, y);
    return () => {
      scrollCache = { x: window.scrollX, y: window.scrollY };
      console.log(scrollCache);
    };
  }, []);

  const go = (index) => {
    const x = window.scrollX;
    const y = window.scrollY;
    route(`/scroll-cache/child?list=${index}&x=${x}&y=${y}`);
  };

  return (
    <div>
      {arr.value.map((item, index) => (
        <div className={style.item} onClick={() => go(index)}>List :{index}</div>
      ))}
    </div>
  );
}
