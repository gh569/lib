import { Swiper } from "antd-mobile";
import style from "./home.module.css";
import { useRef } from "preact/hooks";
import Footer from "./footer/footer";
import { tabIndex, getAvailableTabs } from "./footer/tabs";

function Home() {
  const tabs = getAvailableTabs();
  const swiper = useRef(null);
  
  return (
    <div className={style.main}>
      <Swiper
        className={style.swiper}
        onIndexChange={(index) => (tabIndex.value = index)}
        defaultIndex={tabIndex.value}
        ref={swiper}
        indicator={() => <Footer swiper={swiper} />}
      >
        {Object.entries(tabs).map(([key, tab]) => {
          const TabComponent = tab.comp;
          return (
            <Swiper.Item key={key} className={style.item}>
              <TabComponent />
            </Swiper.Item>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Home;