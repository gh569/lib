import style from "./test.module.css";
import CssModules from "react-css-modules";

function Page() {
  return (
    <div styleName='main-container'>
      <h1 styleName="h1">react-css-modules的使用</h1>
      <div styleName="container">
        <h2 styleName="h2">1.安装</h2>
        <pre  styleName="pre">

        <code styleName="code">npm install react-css-modules --save</code>
        </pre>
        <h2 styleName="h2">2.使用</h2>
        <pre styleName="pre">
          <code styleName="code">
            import CssModules from 'react-css-modules' <br />
            export default CssModules(style)(Page)
          </code>
        </pre>
        <h2 styleName="h2">3.注意</h2>
        <p>
          1.在css文件中使用的类名必须和jsx文件中使用的类名一致，否则会报错。
          <br />

          2.在jsx文件中使用styleName属性，属性值为css文件中使用的类名。
          <br />

        </p>
      </div>
    </div>
  );
}

export default CssModules(style)(Page);
// export default Page
