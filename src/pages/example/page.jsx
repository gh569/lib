import { Router, Route, createHashHistory, Link } from "my";
import style from "./app.module.css";

const modules = import.meta.glob("./**/page.jsx", {
  import: "default",
  eager: true,
});

const routes = Object.keys(modules).map((item) => {
  const path = "/example/" + item.replace(/\.\/|\/page.jsx/gi, "");
  const name = item.replace(/\.\/|\/page.jsx/gi, "");
  const Comp = modules[item];
  return { name, path, Comp };
});

function Home(props) {
  return (
    <div>
      <h1 className={style.h1}>Home</h1>
      {routes
        .filter((v) => v.name.lastIndexOf("/") <= 0)
        .map((item) => {
          return (
            <Link className={style.link} key={item.name} href={item.path}>
              <div className={style.p1}>{item.name}</div>
            </Link>
          );
        })}
    </div>
  );
}


export default Home;
