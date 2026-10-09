import style from "./footer.module.css";
import store from "utils/store.js";
import tabs from "../tabs";

export default function footer({ swiper }) {
  return (
    <div className={style.main}>
      {Object.keys(tabs).map((val) => {
        return (
          <div
            className={
              tabs[val].index == store.tabIndex.value
                ? style.current
                : style.item
            }
            onClick={() => {
              swiper.current.swipeTo(tabs[val].index, true);
            }}
          >
            {tabs[val].text}
          </div>
        );
      })}
    </div>
  );
}
