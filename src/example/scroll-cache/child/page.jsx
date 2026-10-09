import style from "./page.module.css";

export default function Child(props) {
  const { list, x, y } = props;
  return (
    <div>
      <h1 className={style.h1}>Detail</h1>
      <pre>
        <p className={style.text}>
          List:{"\t\t"}
          {list}
        </p>
        <p className={style.text}>
          ScrollX:{"\t"}
          {x}
        </p>
        <p className={style.text}>
          ScrollY:{"\t"}
          {y}
        </p>
      </pre>
    </div>
  );
}
