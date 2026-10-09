import style from "./layout.module.css";

export default function Description({ title, description, children }) {
  return (
    <div>
      <h1 className={style.h1}>{title}</h1>
      <pre className={style.p1}>{description}</pre>
      <div className={style.div1}>{children}</div>
    </div>
  );
}
