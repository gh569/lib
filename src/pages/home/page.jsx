import store from "utils/store.js";
import { Swiper } from "antd-mobile";
import style from "./home.module.css";
import { useRef } from "my";
import footer from "./footer/_footer";
import tabs from "./tabs";

function Home() {
  const swiper = useRef(null);
  return (
    <div className={style.main}>
      <Swiper
        className={style.swiper}
        onIndexChange={(e) => (store.tabIndex.value = e)}
        defaultIndex={store.tabIndex.value}
        ref={swiper}
        indicator={() => footer({ swiper })}
      >
        {Object.keys(tabs).map((item, index) => {
          let Tab = tabs[item].comp;
          return (
            <Swiper.Item key={index} className={style.item}>
              <Tab />
            </Swiper.Item>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Home;
